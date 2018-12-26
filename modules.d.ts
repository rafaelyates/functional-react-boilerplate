// Style modules
declare module '*.module.scss' {
  const scssModule: { [moduleName: string]: string };
  export default scssModule;
}

// Image modules
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
