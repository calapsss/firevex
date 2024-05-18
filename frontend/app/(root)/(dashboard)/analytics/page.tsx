"use client";
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import EditProfile from "@/components/user/edit/profile-edit-card";
import TeamForm from '@/components/team/forms/create-team';
import TeamCard from '../../../../components/team/team-card';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { FolderIcon, PenBoxIcon, UsersIcon } from 'lucide-react';


export default function Page() {
    const userConvex = useQuery(api.functions.users.getUser);
    const teams = useQuery(api.functions.teams.userTeams);

    console.log(teams)
    console.log(userConvex);
    if (userConvex != null && teams != null) return (
        <main className="p-6">
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Topics</CardTitle>
            <CardDescription>The total number of topics created on the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold">1,234</span>
              <FolderIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Content</CardTitle>
            <CardDescription>The number of new content pieces created in the last week.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold">456</span>
              <PenBoxIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Team Members</CardTitle>
            <CardDescription>The number of team members currently active on the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold">78</span>
              <UsersIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Content</CardTitle>
            <CardDescription>A list of the most recent content pieces created on the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Content Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Introduction to Content Management</TableCell>
                  <TableCell>John Doe</TableCell>
                  <TableCell>February 20, 2022</TableCell>
                  <TableCell>Published</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">The Benefits of Collaboration</TableCell>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>January 5, 2022</TableCell>
                  <TableCell>Draft</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Best Practices for Content Creation</TableCell>
                  <TableCell>Michael Johnson</TableCell>
                  <TableCell>August 3, 2021</TableCell>
                  <TableCell>Archived</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Contributors</CardTitle>
            <CardDescription>A list of the top contributors to the platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contributor</TableHead>
                  <TableHead>Content Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">John Doe</TableCell>
                  <TableCell>50</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Jane Smith</TableCell>
                  <TableCell>30</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Michael Johnson</TableCell>
                  <TableCell>20</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      </main>      
    );
}
