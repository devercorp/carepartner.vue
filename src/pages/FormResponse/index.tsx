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
	formType: string;
	respondentName: string;
	respondentEmail: string;
	status: 'new' | 'reviewed' | 'responded' | 'closed';
	priority: 'low' | 'medium' | 'high';
	category: 'caregiver' | 'institution' | 'academy';
	summary: string;
}

const mockResponses: FormResponse[] = [
	{
		id: 'FR-2024-001',
		submittedAt: '2024-12-20 09:15',
		formType: 'Caregiver Support Request',
		respondentName: 'Sarah Johnson',
		respondentEmail: 'sarah.j@email.com',
		status: 'new',
		priority: 'high',
		category: 'caregiver',
		summary: 'Urgent assistance needed for elderly parent care coordination',
	},
	{
		id: 'FR-2024-002',
		submittedAt: '2024-12-20 10:30',
		formType: 'Institution Partnership Inquiry',
		respondentName: 'Mark Wilson',
		respondentEmail: 'm.wilson@healthcare.org',
		status: 'reviewed',
		priority: 'medium',
		category: 'institution',
		summary: 'Interested in establishing partnership for care services',
	},
	{
		id: 'FR-2024-003',
		submittedAt: '2024-12-19 14:22',
		formType: 'Academy Training Request',
		respondentName: 'Lisa Chen',
		respondentEmail: 'l.chen@academy.edu',
		status: 'responded',
		priority: 'low',
		category: 'academy',
		summary: 'Request for advanced caregiver training program information',
	},
	{
		id: 'FR-2024-004',
		submittedAt: '2024-12-19 16:45',
		formType: 'General Consultation',
		respondentName: 'Robert Brown',
		respondentEmail: 'rbrown@email.com',
		status: 'closed',
		priority: 'medium',
		category: 'caregiver',
		summary: 'Questions about medication management for dementia care',
	},
];

const FormResponsePage = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [categoryFilter, setCategoryFilter] = useState('all');
	const [activeTab, setActiveTab] = useState('all');

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'new':
				return 'bg-red-100 text-red-800';
			case 'reviewed':
				return 'bg-yellow-100 text-yellow-800';
			case 'responded':
				return 'bg-blue-100 text-blue-800';
			case 'closed':
				return 'bg-green-100 text-green-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case 'high':
				return 'bg-red-100 text-red-800';
			case 'medium':
				return 'bg-yellow-100 text-yellow-800';
			case 'low':
				return 'bg-green-100 text-green-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const filteredResponses = mockResponses.filter((response) => {
		const matchesSearch =
			response.respondentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			response.respondentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
			response.summary.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesStatus = statusFilter === 'all' || response.status === statusFilter;
		const matchesCategory = categoryFilter === 'all' || response.category === categoryFilter;
		const matchesTab = activeTab === 'all' || response.status === activeTab;

		return matchesSearch && matchesStatus && matchesCategory && matchesTab;
	});

	const getTabCount = (status: string) => {
		if (status === 'all') return mockResponses.length;
		return mockResponses.filter((r) => r.status === status).length;
	};

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

			{/* Status Tabs */}
			<Tabs value={activeTab} onValueChange={setActiveTab}>
				<TabsList>
					<TabsTrigger value="all">전체 ({getTabCount('all')})</TabsTrigger>
					<TabsTrigger value="new">신규 ({getTabCount('new')})</TabsTrigger>
					<TabsTrigger value="reviewed">검토됨 ({getTabCount('reviewed')})</TabsTrigger>
					<TabsTrigger value="responded">응답함 ({getTabCount('responded')})</TabsTrigger>
					<TabsTrigger value="closed">완료 ({getTabCount('closed')})</TabsTrigger>
				</TabsList>

				<TabsContent value={activeTab}>
					<Card>
						<CardHeader>
							<CardTitle>응답 목록 ({filteredResponses.length})</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>ID</TableHead>
										<TableHead>접수일</TableHead>
										<TableHead>폼 유형</TableHead>
										<TableHead>신청자</TableHead>
										<TableHead>분야</TableHead>
										<TableHead>우선순위</TableHead>
										<TableHead>상태</TableHead>
										<TableHead>요약</TableHead>
										<TableHead>작업</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredResponses.map((response) => (
										<TableRow key={response.id}>
											<TableCell className="text-14 font-mono">{response.id}</TableCell>
											<TableCell className="text-14">{response.submittedAt}</TableCell>
											<TableCell>{response.formType}</TableCell>
											<TableCell>
												<div>
													<div className="font-medium">{response.respondentName}</div>
													<div className="text-muted-foreground text-14">{response.respondentEmail}</div>
												</div>
											</TableCell>
											<TableCell>
												<Badge variant="outline" className="capitalize">
													{response.category}
												</Badge>
											</TableCell>
											<TableCell>
												<Badge className={getPriorityColor(response.priority)}>{response.priority}</Badge>
											</TableCell>
											<TableCell>
												<Badge className={getStatusColor(response.status)}>{response.status}</Badge>
											</TableCell>
											<TableCell className="max-w-xs truncate" title={response.summary}>
												{response.summary}
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

							{filteredResponses.length === 0 && (
								<div className="text-muted-foreground py-32 text-center">검색 조건에 맞는 응답이 없습니다.</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default FormResponsePage;
