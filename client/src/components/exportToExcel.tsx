import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';


const exportToExcel = async () => {
    // Criar uma nova instância do Workbook
    const workbook = new ExcelJS.Workbook();

    // Adicionar uma nova planilha
    const worksheet = workbook.addWorksheet('Sheet1');

    // Adicionar dados à planilha
    worksheet.addRow(['Nome', 'Idade', 'Cidade']);
    worksheet.addRow(['João', 30, 'São Paulo']);
    worksheet.addRow(['Maria', 25, 'Rio de Janeiro']);

    // Gerar o arquivo
    const buffer = await workbook.xlsx.writeBuffer();

    // Salvar o arquivo
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(blob, 'dados.xlsx');

    return (
        <>
            <div>
                <button onClick={exportToExcel}>Exportar para Excel</button>
            </div>
        </>
    )
};

export default exportToExcel  