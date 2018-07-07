export function getPageSlag(path){

  return path === '/' ? '/' : path.split('/')[1];
}