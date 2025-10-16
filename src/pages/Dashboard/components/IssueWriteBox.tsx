import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useDeleteIssue, useSaveIssue } from '@/apis/issue';
import { IssueResponseType, IssueWriteFormType } from '@/apis/issue/type';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader } from '@/components/ui/table';
import { TableRow } from '@/components/ui/table';

import IssueWriteRow from './IssueWriteRow';

interface IssueWriteBoxProps {
	dailyType: 'daily' | 'weekly' | 'monthly';
	data?: IssueResponseType[];
	startDate: string;
	category?: '요양사' | '기관' | '아카데미' | '일반';
}

const IssueWriteBox = ({ dailyType, data, startDate, category }: IssueWriteBoxProps) => {
	const { mutateAsync: mutateSaveIssue } = useSaveIssue();
	const { mutateAsync: mutateDeleteIssue } = useDeleteIssue();

	const [rows, setRows] = useState<IssueWriteFormType[]>([]);

	// 새 행 추가
	const addRow = () => {
		const newRow: IssueWriteFormType = {
			dailyType: dailyType,
			category: category ?? '',
			midCategory: '',
			subCategory: '',
			orgCnt: 0,
			issueDetail: '',
			links: [''],
			opinion: '',
		};
		setRows((prev) => [...prev, newRow]);
	};

	// 행 저장 (등록/수정)
	const handleSave = async (index: number, formData: IssueWriteFormType) => {
		try {
			// links 배열을 linkUrl1~4로 변환
			const { links, ...rest } = formData;
			const linkObj: Record<string, string> = {};

			if (links && links.length > 0) {
				links.forEach((link, idx) => {
					if (link && idx < 4) {
						linkObj[`linkUrl${idx + 1}`] = link;
					}
				});
			}

			const transformedData = {
				...rest,
				linkUrl1: linkObj.linkUrl1 || '',
				linkUrl2: linkObj.linkUrl2 || '',
				linkUrl3: linkObj.linkUrl3 || '',
				linkUrl4: linkObj.linkUrl4 || '',
			};

			const res = await mutateSaveIssue([transformedData]);

			if (res.data.result === 'success') {
				alert(formData.issueReportId ? '수정되었습니다.' : '등록되었습니다.');

				// 저장 후 해당 행 업데이트
				setRows((prev) => {
					const newRows = [...prev];
					newRows[index] = {
						...formData,
						issueReportId: formData.issueReportId || res.data.data?.issueReportId,
					};
					return newRows;
				});
			}
		} catch (error) {
			console.error('저장 실패:', error);
			alert('저장에 실패했습니다.');
			throw error;
		}
	};

	// 행 삭제
	const removeRow = async (index: number) => {
		if (rows.length <= 1) {
			alert('최소 1개의 행은 유지되어야 합니다.');
			return;
		}

		const targetRow = rows[index];

		if (targetRow?.issueReportId) {
			try {
				await mutateDeleteIssue({ issue_report_id: targetRow.issueReportId });
				alert('삭제되었습니다.');
			} catch (error) {
				console.error('삭제 실패:', error);
				alert('삭제에 실패했습니다.');
				return;
			}
		}

		setRows((prev) => prev.filter((_, idx) => idx !== index));
	};

	useEffect(() => {
		if (data?.length && data.length > 0) {
			// API 응답 데이터를 links 배열로 변환
			const transformedData = data.map((row) => {
				const links: string[] = [];

				// linkUrl1~4를 배열로 변환
				if (row.linkUrl1) links.push(row.linkUrl1);
				if (row.linkUrl2) links.push(row.linkUrl2);
				if (row.linkUrl3) links.push(row.linkUrl3);
				if (row.linkUrl4) links.push(row.linkUrl4);

				// 최소 1개는 있어야 함
				if (links.length === 0) links.push('');

				return {
					...row,
					links,
				};
			});

			setRows(transformedData);
		} else {
			// 데이터가 없으면 빈 행 하나 추가
			setRows([
				{
					dailyType: dailyType,
					category: category ?? '',
					midCategory: '',
					subCategory: '',
					orgCnt: 0,
					issueDetail: '',
					links: [''],
					opinion: '',
				},
			]);
		}
	}, [data, dailyType, category]);

	return (
		<div className="space-y-24">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>응대 Issue 문의 상세</CardTitle>
					<div className="flex items-center gap-8">
						<Button onClick={addRow} variant="outline" size="sm">
							<Plus className="mr-8 h-16 w-16" />행 추가
						</Button>
					</div>
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
								<TableHead className="w-[60px] text-center"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{rows.map((row, index) => (
								<IssueWriteRow
									key={row.issueReportId ? `issue-${row.issueReportId}` : `new-${index}`}
									data={row}
									index={index}
									removeRow={removeRow}
									onSave={handleSave}
									canDelete={rows.length > 1}
									startDate={startDate}
									isCategory={category ? true : false}
								/>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

export default IssueWriteBox;
