import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { SubmitErrorHandler, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import z from 'zod';

import { useDeleteIssue, useSaveIssue } from '@/apis/issue';
import { IssueResponseType, IssueWriteFormType } from '@/apis/issue/type';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader } from '@/components/ui/table';
import { TableRow } from '@/components/ui/table';

import IssueWriteRow from './IssueWriteRow';

interface IssueWriteForm {
	rows: IssueWriteFormType[];
}

interface IssueWriteBoxProps {
	dailyType: 'daily' | 'weekly' | 'monthly';
	data?: IssueResponseType[];
	startDate: string;
	category?: '요양사' | '기관' | '아카데미' | '일반';
}

const IssueWriteBox = ({ dailyType, data, startDate, category }: IssueWriteBoxProps) => {
	const {
		control,
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<IssueWriteForm>({
		defaultValues: {
			rows: [
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
			],
		},
		resolver: zodResolver(
			z.object({
				rows: z.array(
					z.object({
						issueReportId: z.number().optional(),
						dailyType: z.enum(['daily', 'weekly', 'monthly']),
						category: z.string().min(1, '대분류를 선택해주세요'),
						midCategory: z.string().min(1, '중분류를 선택해주세요'),
						subCategory: z.string().min(1, '소분류를 선택해주세요'),
						orgCnt: z.number(),
						issueDetail: z.string().optional(),
						links: z.array(z.string()).optional(),
						opinion: z.string().optional(),
					})
				),
			})
		),
	});

	const { mutateAsync: mutateSaveIssue } = useSaveIssue();
	const { mutateAsync: mutateDeleteIssue } = useDeleteIssue();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'rows',
	});

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
		append(newRow);
	};

	// 행 삭제
	const removeRow = (index: number) => {
		if (fields.length > 1) {
			remove(index);

			const findIndex = watch('rows')[index]?.issueReportId;

			if (findIndex) {
				mutateDeleteIssue({ issue_report_id: findIndex });
			}
		}
	};

	// 카테고리 연계 업데이트 (대분류 변경 시 하위 분류 초기화)
	const handleCategoryChange = (index: number, value: string) => {
		setValue(`rows.${index}.category`, value);
		setValue(`rows.${index}.midCategory`, '');
		setValue(`rows.${index}.subCategory`, '');
	};

	// 중분류 변경 시 소분류 초기화
	const handleMidCategoryChange = (index: number, value: string) => {
		setValue(`rows.${index}.midCategory`, value);
		setValue(`rows.${index}.subCategory`, '');
	};

	// 폼 제출 핸들러
	const onSubmit: SubmitHandler<IssueWriteForm> = async (data) => {
		console.log('Form Data:', data);

		// links 배열을 linkUrl1, linkUrl2, linkUrl3, linkUrl4로 변환
		const transformedRows = data.rows.map((row) => {
			const { links, ...rest } = row;
			const linkObj: Record<string, string> = {};

			// links 배열을 linkUrl1~4로 변환
			if (links && links.length > 0) {
				links.forEach((link, idx) => {
					if (link && idx < 4) {
						linkObj[`linkUrl${idx + 1}`] = link;
					}
				});
			}

			return {
				...rest,
				linkUrl1: linkObj.linkUrl1 || '',
				linkUrl2: linkObj.linkUrl2 || '',
				linkUrl3: linkObj.linkUrl3 || '',
				linkUrl4: linkObj.linkUrl4 || '',
			};
		});

		mutateSaveIssue(transformedRows).then((res) => {
			if (res.data.result === 'success') {
				alert('저장되었습니다.');
			}
		});
	};

	const onError: SubmitErrorHandler<IssueWriteForm> = (error) => {
		console.log('Error:', error);
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

			setValue('rows', transformedData, { shouldDirty: true });
		}
	}, [data, setValue]);

	return (
		<div className="space-y-24">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>응대 Issue 문의 상세</CardTitle>
					<div className="flex items-center gap-8">
						<Button onClick={addRow} variant="outline" size="sm">
							<Plus className="mr-8 h-16 w-16" />행 추가
						</Button>
						<Button type="submit" variant="default" size="sm" form="issue-write-form">
							저장
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<form id="issue-write-form" onSubmit={handleSubmit(onSubmit, onError)}>
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
								{fields.map((field, index) => (
									<IssueWriteRow
										key={field.id}
										index={index}
										register={register}
										watch={watch}
										setValue={setValue}
										removeRow={removeRow}
										onCategoryChange={handleCategoryChange}
										onMidCategoryChange={handleMidCategoryChange}
										canDelete={fields.length > 1}
										startDate={startDate}
										isCategory={category ? true : false}
										errors={errors?.rows?.[index]}
									/>
								))}
							</TableBody>
						</Table>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default IssueWriteBox;
