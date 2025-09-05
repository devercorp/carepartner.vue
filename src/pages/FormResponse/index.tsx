import { Search, Filter, Download, Eye, MessageCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

interface FormResponse {
	id: string;
	submittedAt: string;
	contact: string;
	satisfaction: number;
	accuracy: number;
	record: string;
	content: string;
}

const mockResponses: FormResponse[] = [
	{
		id: '4',
		submittedAt: '2024-12-20 09:15',
		contact: '010-1234-5678',
		satisfaction: 5,
		accuracy: 5,
		record: '문의 내역',
		content: '문의 내역',
	},
	{
		id: '3',
		submittedAt: '2024-12-20 10:30',
		contact: '010-1234-5678',
		satisfaction: 5,
		accuracy: 5,
		record: '문의 내역',
		content: '문의 내역',
	},
	{
		id: '2',
		submittedAt: '2024-12-19 14:22',
		contact: '010-1234-5678',
		satisfaction: 5,
		accuracy: 5,
		record: '문의 내역',
		content: '문의 내역',
	},
	{
		id: '1',
		submittedAt: '2024-12-19 16:45',
		contact: '010-1234-5678',
		satisfaction: 5,
		accuracy: 5,
		record: '문의 내역',
		content: '문의 내역',
	},
];

const FormResponsePage = () => {
	const getPriorityColor = (priority: number) => {
		switch (priority) {
			case 5:
				return 'bg-red-100 text-red-800';
			case 4:
			case 3:
				return 'bg-yellow-100 text-yellow-800';
			case 2:
			case 1:
				return 'bg-gray-100 text-gray-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	// const filteredResponses = mockResponses.filter((response) => {
	// 	const matchesSearch =
	// 		response.respondentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
	// 		response.respondentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
	// 		response.summary.toLowerCase().includes(searchTerm.toLowerCase());

	// 	const matchesStatus = statusFilter === 'all' || response.status === statusFilter;
	// 	const matchesCategory = categoryFilter === 'all' || response.category === categoryFilter;
	// 	const matchesTab = activeTab === 'all' || response.status === activeTab;

	// 	return matchesSearch && matchesStatus && matchesCategory && matchesTab;
	// });

	const handleMoveFormTemplate = () => {
		window.open(window.location.origin + '/form-template', '_blank');
	};

	return (
		<div className="space-y-24 p-24">
			<div className="flex items-center justify-between">
				<h1 className="text-4xl font-semibold">응답 관리</h1>
				<div className="flex gap-8">
					<Button variant="outline" size="sm" onClick={handleMoveFormTemplate}>
						<ExternalLink className="mr-8 h-16 w-16" />
						상담 신청서로 이동
					</Button>
					{/* <Button variant="outline" size="sm">
						<Download className="mr-8 h-16 w-16" />
						내보내기
					</Button> */}
				</div>
			</div>

			{/* Filters */}
			{/* <Card>
				<CardContent className="px-16">
					<div className="flex flex-col gap-16 sm:flex-row">
						<div className="flex-1">
							<div className="relative">
								<Search className="absolute top-1/2 left-12 h-16 w-16 -translate-y-1/2 transform text-gray-400" />
								<Input
									placeholder="이름, 이메일, 요약으로 검색..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-40"
								/>
							</div>
						</div>

						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger className="w-160">
								<SelectValue placeholder="Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">전체 상태</SelectItem>
								<SelectItem value="new">신규</SelectItem>
								<SelectItem value="reviewed">검토됨</SelectItem>
								<SelectItem value="responded">응답함</SelectItem>
								<SelectItem value="closed">완료</SelectItem>
							</SelectContent>
						</Select>

						<Select value={categoryFilter} onValueChange={setCategoryFilter}>
							<SelectTrigger className="w-160">
								<SelectValue placeholder="Category" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">전체 분야</SelectItem>
								<SelectItem value="caregiver">간병인</SelectItem>
								<SelectItem value="institution">기관</SelectItem>
								<SelectItem value="academy">교육</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card> */}

			<Card>
				<CardHeader>
					<CardTitle>응답 목록</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>ID</TableHead>
								<TableHead>접수일</TableHead>
								<TableHead>전화번호</TableHead>
								<TableHead>상담 만족도</TableHead>
								<TableHead>대응 만족도</TableHead>
								<TableHead>비고</TableHead>
								<TableHead>작업</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{mockResponses.map((response) => (
								<TableRow key={response.id}>
									<TableCell className="font-mono text-xl">{response.id}</TableCell>
									<TableCell className="text-xl">{response.submittedAt}</TableCell>
									<TableCell>
										<div className="font-medium">{response.contact}</div>
									</TableCell>
									<TableCell>
										<Badge variant="outline" className="capitalize">
											{response.satisfaction}
										</Badge>
									</TableCell>
									<TableCell>
										<Badge className={getPriorityColor(response.accuracy)}>{response.accuracy}</Badge>
									</TableCell>
									<TableCell className="max-w-xs truncate" title={response.content}>
										{response.content}
									</TableCell>
									<TableCell>
										<div className="flex gap-4">
											<Button variant="ghost" size="sm">
												<Eye className="h-16 w-16" />
											</Button>
											<Button variant="ghost" size="sm">
												<MessageCircle className="h-16 w-16" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>

					{mockResponses.length === 0 && (
						<div className="text-muted-foreground py-32 text-center">검색 조건에 맞는 응답이 없습니다.</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default FormResponsePage;
