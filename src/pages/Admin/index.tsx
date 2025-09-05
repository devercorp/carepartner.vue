import { Plus, Edit, Trash2, Search, Shield, User, Mail, Calendar, Settings } from 'lucide-react';
import { useState } from 'react';

import { Alert, AlertDescription } from '../../components/ui/alert';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

interface AdminUser {
	id: string;
	name: string;
	email: string;
	role: 'super_admin' | 'admin' | 'manager' | 'viewer';
	status: 'active' | 'inactive' | 'pending';
	lastLogin: string;
	createdAt: string;
	permissions: string[];
}

const mockAdmins: AdminUser[] = [
	{
		id: '1',
		name: 'John Smith',
		email: 'john.smith@consulting.com',
		role: 'super_admin',
		status: 'active',
		lastLogin: '2024-12-20 09:30',
		createdAt: '2024-01-15',
		permissions: ['all'],
	},
	{
		id: '2',
		name: 'Sarah Wilson',
		email: 'sarah.wilson@consulting.com',
		role: 'admin',
		status: 'active',
		lastLogin: '2024-12-19 16:45',
		createdAt: '2024-03-22',
		permissions: ['dashboard', 'forms', 'reports'],
	},
	{
		id: '3',
		name: 'Mike Johnson',
		email: 'mike.johnson@consulting.com',
		role: 'manager',
		status: 'active',
		lastLogin: '2024-12-18 14:20',
		createdAt: '2024-06-10',
		permissions: ['dashboard', 'forms'],
	},
	{
		id: '4',
		name: 'Emily Davis',
		email: 'emily.davis@consulting.com',
		role: 'viewer',
		status: 'inactive',
		lastLogin: '2024-12-10 11:15',
		createdAt: '2024-08-05',
		permissions: ['dashboard'],
	},
];

const rolePermissions = {
	super_admin: ['all'],
	admin: ['dashboard', 'forms', 'reports', 'users'],
	manager: ['dashboard', 'forms'],
	viewer: ['dashboard'],
};

const AdminPage = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [roleFilter, setRoleFilter] = useState('all');
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
	const [newUser, setNewUser] = useState({
		name: '',
		email: '',
		role: '',
	});

	const getRoleColor = (role: string) => {
		switch (role) {
			case 'super_admin':
				return 'bg-red-100 text-red-800';
			case 'admin':
				return 'bg-blue-100 text-blue-800';
			case 'manager':
				return 'bg-green-100 text-green-800';
			case 'viewer':
				return 'bg-gray-100 text-gray-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'active':
				return 'bg-green-100 text-green-800';
			case 'inactive':
				return 'bg-gray-100 text-gray-800';
			case 'pending':
				return 'bg-yellow-100 text-yellow-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const filteredAdmins = mockAdmins.filter((admin) => {
		const matchesSearch =
			admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			admin.email.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesStatus = statusFilter === 'all' || admin.status === statusFilter;
		const matchesRole = roleFilter === 'all' || admin.role === roleFilter;

		return matchesSearch && matchesStatus && matchesRole;
	});

	const handleCreateUser = () => {
		// Here you would normally send the data to your API
		console.log('Creating user:', newUser);
		setIsCreateDialogOpen(false);
		setNewUser({ name: '', email: '', role: '' });
	};

	const formatRole = (role: string) => {
		return role
			.split('_')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};

	return (
		<div className="space-y-6 p-6">
			<div className="flex items-center justify-between">
				<div>
					<h1>Admin Management</h1>
					<p className="text-muted-foreground">Manage system administrators and their permissions</p>
				</div>
				<Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
					<DialogTrigger asChild>
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							Add Admin
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New Administrator</DialogTitle>
						</DialogHeader>
						<div className="space-y-4">
							<div>
								<Label htmlFor="name">Full Name</Label>
								<Input
									id="name"
									value={newUser.name}
									onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
									placeholder="Enter full name"
								/>
							</div>

							<div>
								<Label htmlFor="email">Email Address</Label>
								<Input
									id="email"
									type="email"
									value={newUser.email}
									onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
									placeholder="Enter email address"
								/>
							</div>

							<div>
								<Label htmlFor="role">Role</Label>
								<Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
									<SelectTrigger>
										<SelectValue placeholder="Select role" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="admin">Admin</SelectItem>
										<SelectItem value="manager">Manager</SelectItem>
										<SelectItem value="viewer">Viewer</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{newUser.role && (
								<Alert>
									<Shield className="h-4 w-4" />
									<AlertDescription>
										<strong>{formatRole(newUser.role)} Permissions:</strong>
										<br />
										{rolePermissions[newUser.role as keyof typeof rolePermissions].join(', ')}
									</AlertDescription>
								</Alert>
							)}

							<div className="flex justify-end gap-2">
								<Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
									Cancel
								</Button>
								<Button onClick={handleCreateUser}>Add Administrator</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			{/* Statistics Cards */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-3">
							<div className="rounded-lg bg-blue-100 p-2">
								<User className="h-5 w-5 text-blue-600" />
							</div>
							<div>
								<p className="text-muted-foreground text-sm">Total Admins</p>
								<p className="text-xl">{mockAdmins.length}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-3">
							<div className="rounded-lg bg-green-100 p-2">
								<Shield className="h-5 w-5 text-green-600" />
							</div>
							<div>
								<p className="text-muted-foreground text-sm">Active</p>
								<p className="text-xl">{mockAdmins.filter((a) => a.status === 'active').length}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-3">
							<div className="rounded-lg bg-red-100 p-2">
								<Settings className="h-5 w-5 text-red-600" />
							</div>
							<div>
								<p className="text-muted-foreground text-sm">Super Admins</p>
								<p className="text-xl">{mockAdmins.filter((a) => a.role === 'super_admin').length}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-4">
						<div className="flex items-center gap-3">
							<div className="rounded-lg bg-yellow-100 p-2">
								<Calendar className="h-5 w-5 text-yellow-600" />
							</div>
							<div>
								<p className="text-muted-foreground text-sm">This Month</p>
								<p className="text-xl">2</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Filters */}
			<Card>
				<CardContent className="p-4">
					<div className="flex flex-col gap-4 sm:flex-row">
						<div className="flex-1">
							<div className="relative">
								<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
								<Input
									placeholder="Search administrators..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10"
								/>
							</div>
						</div>

						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger className="w-40">
								<SelectValue placeholder="Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="active">Active</SelectItem>
								<SelectItem value="inactive">Inactive</SelectItem>
								<SelectItem value="pending">Pending</SelectItem>
							</SelectContent>
						</Select>

						<Select value={roleFilter} onValueChange={setRoleFilter}>
							<SelectTrigger className="w-40">
								<SelectValue placeholder="Role" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Roles</SelectItem>
								<SelectItem value="super_admin">Super Admin</SelectItem>
								<SelectItem value="admin">Admin</SelectItem>
								<SelectItem value="manager">Manager</SelectItem>
								<SelectItem value="viewer">Viewer</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Administrators Table */}
			<Card>
				<CardHeader>
					<CardTitle>Administrators ({filteredAdmins.length})</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Administrator</TableHead>
								<TableHead>Role</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Last Login</TableHead>
								<TableHead>Created</TableHead>
								<TableHead>Permissions</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredAdmins.map((admin) => (
								<TableRow key={admin.id}>
									<TableCell>
										<div className="flex items-center gap-3">
											<div className="rounded-full bg-gray-100 p-2">
												<User className="h-4 w-4" />
											</div>
											<div>
												<div className="font-medium">{admin.name}</div>
												<div className="text-muted-foreground flex items-center gap-1 text-sm">
													<Mail className="h-3 w-3" />
													{admin.email}
												</div>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<Badge className={getRoleColor(admin.role)}>{formatRole(admin.role)}</Badge>
									</TableCell>
									<TableCell>
										<Badge className={getStatusColor(admin.status)}>{admin.status}</Badge>
									</TableCell>
									<TableCell className="text-sm">{admin.lastLogin}</TableCell>
									<TableCell className="text-sm">{admin.createdAt}</TableCell>
									<TableCell>
										<div className="flex flex-wrap gap-1">
											{admin.permissions.slice(0, 2).map((permission, index) => (
												<Badge key={index} variant="outline" className="text-xs">
													{permission}
												</Badge>
											))}
											{admin.permissions.length > 2 && (
												<Badge variant="outline" className="text-xs">
													+{admin.permissions.length - 2} more
												</Badge>
											)}
										</div>
									</TableCell>
									<TableCell>
										<div className="flex gap-1">
											<Button variant="ghost" size="sm" title="Edit">
												<Edit className="h-4 w-4" />
											</Button>
											{admin.role !== 'super_admin' && (
												<Button variant="ghost" size="sm" title="Delete">
													<Trash2 className="h-4 w-4 text-red-500" />
												</Button>
											)}
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>

					{filteredAdmins.length === 0 && (
						<div className="text-muted-foreground py-8 text-center">
							No administrators found matching your criteria.
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default AdminPage;
