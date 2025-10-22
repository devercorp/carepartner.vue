import { format } from 'date-fns';
import * as XLSX from 'xlsx';

interface ColumnType {
	key: string;
	type: 'string' | 'number' | 'date';
}

interface ExcelExportProps {
	name: string;
	data: Array<{ [key: string]: any }>;
	headers: Array<string>;
	needNumber?: boolean;
	columnTypes?: ColumnType[]; // 컬럼 타입 지정
}

/**
 * 컬럼 타입을 쉽게 생성하는 헬퍼 함수
 */
export const createColumnTypes = (types: Array<'string' | 'number' | 'date'>): ColumnType[] => {
	return types.map((type, index) => ({
		key: `col_${index}`,
		type,
	}));
};

/**
 * 특정 컬럼의 타입을 지정하는 헬퍼 함수
 */
export const setColumnType = (key: string, type: 'string' | 'number' | 'date'): ColumnType => ({
	key,
	type,
});

/**
 * 엑셀 다운로드 (XLSX 형식)
 */
const excelExport = async ({ name, data, headers, needNumber, columnTypes }: ExcelExportProps) => {
	try {
		if (data.length > 0) {
			// 헤더 준비
			const finalHeaders = [...headers];
			if (needNumber) {
				finalHeaders.unshift('No.');
			}

			// 데이터 준비
			const excelData = data.map((item, index) => {
				const values = Object.values(item);

				// 컬럼 타입에 따라 데이터 변환
				const processedValues = values.map((value, colIndex) => {
					if (!columnTypes || !columnTypes[colIndex]) return value;

					const columnType = columnTypes[colIndex];
					switch (columnType.type) {
						case 'string':
							return String(value);
						case 'number': {
							// 숫자로 변환, 실패하면 원본 값 반환
							const num = Number(value);
							return isNaN(num) ? value : num;
						}
						case 'date':
							// 날짜 처리 (필요시 확장)
							return value;
						default:
							return value;
					}
				});

				if (needNumber) {
					return [index + 1, ...processedValues];
				}
				return processedValues;
			});

			// 헤더와 데이터 결합
			const worksheetData = [finalHeaders, ...excelData];

			// 워크시트 생성
			const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

			// 컬럼 타입 설정 (셀 포맷 지정)
			if (columnTypes) {
				columnTypes.forEach((colType, colIndex) => {
					const actualColIndex = needNumber ? colIndex + 1 : colIndex;
					const colLetter = XLSX.utils.encode_col(actualColIndex);

					// 데이터 행에 대해 셀 타입 설정
					for (let row = 1; row <= data.length; row++) {
						const cellAddress = `${colLetter}${row + 1}`;

						if (worksheet[cellAddress]) {
							switch (colType.type) {
								case 'string':
									worksheet[cellAddress].t = 's'; // string
									break;
								case 'number':
									worksheet[cellAddress].t = 'n'; // number
									break;
								case 'date':
									worksheet[cellAddress].t = 'd'; // date
									break;
							}
						}
					}
				});
			}

			// 컬럼 너비 자동 조정
			const colWidths = finalHeaders.map((header, index) => {
				const maxLength = Math.max(header.length, ...excelData.map((row) => String(row[index] || '').length));
				return { wch: Math.min(maxLength + 2, 50) }; // 최대 50자로 제한
			});
			worksheet['!cols'] = colWidths;

			// 워크북 생성
			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

			const date = format(new Date(), 'yyyyMMdd');

			// 파일 다운로드
			const fileName = `${name}_${date}.xlsx`;
			XLSX.writeFile(workbook, fileName);

			return true;
		}
		return false;
	} catch (error) {
		console.error('엑셀 다운로드 중 오류 발생:', error);
		return false;
	}
};

export default excelExport;
