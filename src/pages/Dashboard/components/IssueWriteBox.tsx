import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader } from '@/components/ui/table';
import { TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

// 카테고리 데이터 구조
const categoryData = {
	기관: {
		오류: ['공고마감'],
		기타: ['시스템오류', '접근권한'],
	},
	요양사: {
		오류: ['지원오류', '프로필오류'],
		기타: ['문의사항', '기타'],
	},
};

// 행 데이터 타입 정의
interface RowData {
	id: string;
	mainCategory: string;
	subCategory: string;
	detailCategory: string;
	riskLevel: string;
	issueDetail: string;
	linkText: string;
	improvement: string;
}

const IssueWriteBox = () => {
	const [rows, setRows] = useState<RowData[]>([
		{
			id: '1',
			mainCategory: '',
			subCategory: '',
			detailCategory: '',
			riskLevel: '',
			issueDetail: '',
			linkText: '',
			improvement: '',
		},
	]);

	// 새 행 추가
	const addRow = () => {
		const newRow: RowData = {
			id: Date.now().toString(),
			mainCategory: '',
			subCategory: '',
			detailCategory: '',
			riskLevel: '',
			issueDetail: '',
			linkText: '',
			improvement: '',
		};
		setRows([...rows, newRow]);
	};

	// 행 삭제
	const removeRow = (id: string) => {
		if (rows.length > 1) {
			setRows(rows.filter((row) => row.id !== id));
		}
	};

	// 행 데이터 업데이트
	const updateRow = (id: string, field: keyof RowData, value: string) => {
		setRows(
			rows.map((row) => {
				if (row.id === id) {
					const updatedRow = { ...row, [field]: value };

					// 대분류가 변경되면 중분류, 소분류 초기화
					if (field === 'mainCategory') {
						updatedRow.subCategory = '';
						updatedRow.detailCategory = '';
					}
					// 중분류가 변경되면 소분류 초기화
					if (field === 'subCategory') {
						updatedRow.detailCategory = '';
					}

					return updatedRow;
				}
				return row;
			})
		);
	};

	// 링크 렌더링 함수
	const renderLink = (linkText: string) => {
		if (!linkText) return '-';

		// URL 패턴 검사 (http://, https://, www. 시작하는 텍스트)
		const urlPattern = /^(https?:\/\/|www\.)/i;
		const isUrl = urlPattern.test(linkText);

		if (isUrl) {
			const fullUrl = linkText.startsWith('www.') ? `https://${linkText}` : linkText;
			return (
				<a
					href={fullUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-4 text-blue-600 underline hover:text-blue-800"
				>
					{linkText}
					<ExternalLink className="h-12 w-12" />
				</a>
			);
		}

		return linkText;
	};

	return (
		<div className="space-y-24">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>응대 Issue 문의 상세</CardTitle>
					<Button onClick={addRow} variant="outline" size="sm">
						<Plus className="mr-8 h-16 w-16" />행 추가
					</Button>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow className="bg-gray-100">
								<TableHead className="w-[120px] text-center">대분류</TableHead>
								<TableHead className="w-[120px] text-center">중분류</TableHead>
								<TableHead className="w-[120px] text-center">소분류</TableHead>
								<TableHead className="w-[120px] text-center">기간별 건수 조회</TableHead>
								<TableHead className="text-center">Issue 상세</TableHead>
								<TableHead className="w-[120px] text-center">링크 삽입</TableHead>
								<TableHead className="text-center">의견</TableHead>
								<TableHead className="w-[60px] text-center">삭제</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{rows.map((row) => (
								<TableRow key={row.id}>
									{/* 대분류 */}
									<TableCell>
										<Select
											value={row.mainCategory}
											onValueChange={(value) => updateRow(row.id, 'mainCategory', value)}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="선택" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="기관">기관</SelectItem>
												<SelectItem value="요양사">요양사</SelectItem>
											</SelectContent>
										</Select>
									</TableCell>

									{/* 중분류 */}
									<TableCell>
										<Select
											value={row.subCategory}
											onValueChange={(value) => updateRow(row.id, 'subCategory', value)}
											disabled={!row.mainCategory}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="선택" />
											</SelectTrigger>
											<SelectContent>
												{row.mainCategory &&
													categoryData[row.mainCategory as keyof typeof categoryData] &&
													Object.keys(categoryData[row.mainCategory as keyof typeof categoryData]).map((subCat) => (
														<SelectItem key={subCat} value={subCat}>
															{subCat}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
									</TableCell>

									{/* 소분류 */}
									<TableCell>
										<Select
											value={row.detailCategory}
											onValueChange={(value) => updateRow(row.id, 'detailCategory', value)}
											disabled={!row.mainCategory || !row.subCategory}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="선택" />
											</SelectTrigger>
											<SelectContent>
												{row.mainCategory &&
													row.subCategory &&
													categoryData[row.mainCategory as keyof typeof categoryData]?.[
														row.subCategory as keyof (typeof categoryData)[keyof typeof categoryData]
													]?.map((detailCat) => (
														<SelectItem key={detailCat} value={detailCat}>
															{detailCat}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
									</TableCell>

									{/* 기간별 건수 조회 */}
									<TableCell>
										<Input
											type="text"
											inputMode="numeric"
											className="text-end"
											value={row.riskLevel}
											onChange={(e) => updateRow(row.id, 'riskLevel', e.target.value)}
											placeholder="건수"
										/>
									</TableCell>

									{/* Issue 상세 */}
									<TableCell>
										<Textarea
											value={row.issueDetail}
											onChange={(e) => updateRow(row.id, 'issueDetail', e.target.value)}
											placeholder="이슈 상세 내용을 입력하세요"
											className="min-h-120 resize-none"
										/>
									</TableCell>

									{/* 링크 삽입 */}
									<TableCell>
										<div className="space-y-8">
											<Input
												value={row.linkText}
												onChange={(e) => updateRow(row.id, 'linkText', e.target.value)}
												placeholder="URL 또는 텍스트"
											/>
											<div className="min-h-[20px] text-sm text-gray-600">{renderLink(row.linkText)}</div>
										</div>
									</TableCell>

									{/* 의견 */}
									<TableCell>
										<Textarea
											value={row.improvement}
											onChange={(e) => updateRow(row.id, 'improvement', e.target.value)}
											placeholder="개선 방향이나 의견을 입력하세요"
											className="min-h-120 resize-none"
										/>
									</TableCell>

									{/* 삭제 버튼 */}
									<TableCell className="text-center">
										<Button
											onClick={() => removeRow(row.id)}
											variant="ghost"
											size="sm"
											className="text-red-500 hover:text-red-700"
											disabled={rows.length === 1}
										>
											<Trash2 className="h-16 w-16" />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

export default IssueWriteBox;
