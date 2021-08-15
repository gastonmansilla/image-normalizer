export function downloadFile(url: string, filename: string, extension: string) {
  const fullName = `${filename}.${extension}`;

  const link = document.createElement('a');
  if (link.download !== undefined) {
    link.setAttribute('href', url);
    link.setAttribute('download', fullName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
