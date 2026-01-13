import { Command } from 'commander';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';
import { getAvailableComponents } from '../utils/components.js';
export function addCommand() {
    const command = new Command('add');
    command
        .argument('<components...>', 'components to add')
        .description('Add components to your project')
        .action(async (components) => {
        try {
            const uiPath = path.resolve(process.cwd(), 'src', 'app', 'ui');
            const __dirname = path.dirname(fileURLToPath(import.meta.url));
            const componentsPath = path.resolve(__dirname, '../../../ui/src/components');
            if (!fs.existsSync(uiPath)) {
                logger.error('src/app/ui directory not found. Run "npx apsara-ui init" first.');
                process.exit(1);
            }
            const availableComponents = getAvailableComponents(componentsPath);
            if (!Array.isArray(components) || components.length === 0) {
                logger.error('No components specified. Usage: npx apsara-ui add button input card');
                process.exit(1);
            }
            const invalidComponents = components.filter(c => !availableComponents.includes(c));
            if (invalidComponents.length > 0) {
                logger.error(`Unknown components: ${invalidComponents.join(', ')}`);
                logger.info(`Available: ${availableComponents.join(', ')}`);
                process.exit(1);
            }
            let addedCount = 0;
            for (const component of components) {
                const sourcePath = path.join(componentsPath, component);
                const targetPath = path.join(uiPath, component);
                if (fs.existsSync(targetPath)) {
                    logger.warn(`Component "${component}" already exists. Skipping.`);
                    continue;
                }
                fs.copySync(sourcePath, targetPath);
                addedCount++;
                logger.success(`Added: ${component}`);
            }
            updateIndexFile(uiPath, components);
            logger.success(`\nAdded ${addedCount} component(s).`);
        }
        catch (error) {
            logger.error('Failed to add components.');
            console.error(error);
            process.exit(1);
        }
    });
    return command;
}
function updateIndexFile(uiPath, components) {
    const indexPath = path.join(uiPath, 'index.ts');
    let content = '';
    for (const component of components) {
        content += `export * from './${component}/${component}.component';\n`;
        content += `export * from './${component}/index';\n`;
    }
    fs.writeFileSync(indexPath, content);
    logger.info(`Updated: src/app/ui/index.ts`);
}
