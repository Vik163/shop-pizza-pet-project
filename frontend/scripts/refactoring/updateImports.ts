import { Project } from 'ts-morph'; // для изменения ts кода

// команда для запуска файла: npx ts-node .\scripts\updateImports.ts
// 12_5 3min
const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isAbsolute(value: string) {
   const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
   return layers.some((layer) => value.startsWith(layer));
}

files.forEach((sourceFile) => {
   const importDeclarations = sourceFile.getImportDeclarations();
   importDeclarations.forEach((importDeclaration) => {
      const value = importDeclaration.getModuleSpecifierValue();

      if (isAbsolute(value)) {
         importDeclaration.setModuleSpecifier(`@/${value}`);
      }
   });
});

project.save();
