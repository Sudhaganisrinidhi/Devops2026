async function readExample() {
  try {
    const data = await fs.readFile('myfile.txt', 'utf8');
    console.log('File content:', data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}
readExample();
