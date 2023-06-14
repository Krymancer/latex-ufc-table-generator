const generateButton = document.getElementById('generate-button');
const copyButton = document.getElementById('copy-button');
const inputTextArea = document.getElementById('input-textarea');
const outputTextArea = document.getElementById('output-textarea');

generateButton.addEventListener('click', () => {
  const inputText = inputTextArea.value;
  const outputText = generateLatexTable(inputText);
  outputTextArea.value = outputText;
});

copyButton.addEventListener('click', () => {
  navigator.clipboard.writeText(outputTextArea.value);
});

function generateLatexTable(inputText) {
  let lines = inputText.split('\n');

  let latexTable = '\\begin{table}[h!]\n';
  latexTable += '\\captionsetup{width=16cm}\n'
	latexTable += '\\Caption{\\label{tab:change_this_label} Table caption goes here}\n'
  latexTable += '\\IBGEtab{}{'
  latexTable += '\\begin{tabularx}{\\textwidth}{|';
  console.log(lines)
  let headers = lines[0].split('\t');
  let numColumns = headers.length;

  for (let i = 0; i < numColumns; i++) {
      latexTable += 'X|';
  }
  latexTable += '}\n\\hline\n';

  for (let header of headers) {
      latexTable += '\\textbf{' + header + '} & ';
  }

  latexTable = latexTable.slice(0, -2);

  latexTable += '\\\\\n\\hline\n';

  for (let line of lines) {
    if(line === "") {
      continue;
    }
    latexTable += line.split('\t').join(' & ') + ' \\\\\n';
  }

  latexTable += '\\hline \n \\end{tabularx}\n}\n{\\Fonte{O autor.}\n}\n\\end{table}';

  return latexTable;
}

