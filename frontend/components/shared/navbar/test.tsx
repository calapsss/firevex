/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HxHEtxTmUB8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

export default function Component() {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <Package2Icon className="h-6 w-6" />
              <span className="">Acme Inc</span>
            </Link>
            <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <ShoppingCartIcon className="h-4 w-4" />
                Orders
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">6</Badge>
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                href="#"
              >
                <PackageIcon className="h-4 w-4" />
                Products
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <UsersIcon className="h-4 w-4" />
                Customers
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <LineChartIcon className="h-4 w-4" />
                Analytics
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>Unlock all features and get unlimited access to our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="sm">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <form className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input className="pl-8 bg-white dark:bg-gray-950" placeholder="Search..." type="search" />
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                  size="icon"
                  variant="ghost"
                >
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="32"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Orders</CardTitle>
                <CardDescription>The total number of orders placed on the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold">1,234</span>
                  <ShoppingCartIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>New Customers</CardTitle>
                <CardDescription>The number of new customers that have signed up.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold">456</span>
                  <UsersIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>The total revenue generated from all orders.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold">$78,901</span>
                  <DollarSignIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>A list of the most recent orders placed on the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">#3210</TableCell>
                      <TableCell>Olivia Martin</TableCell>
                      <TableCell>February 20, 2022</TableCell>
                      <TableCell>Shipped</TableCell>
                      <TableCell>$42.25</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">#3209</TableCell>
                      <TableCell>Ava Johnson</TableCell>
                      <TableCell>January 5, 2022</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>$74.99</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">#3204</TableCell>
                      <TableCell>Michael Johnson</TableCell>
                      <TableCell>August 3, 2021</TableCell>
                      <TableCell>Unfulfilled</TableCell>
                      <TableCell>$64.75</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>A list of the top selling products on the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Glimmer Lamps</TableCell>
                      <TableCell>500</TableCell>
                      <TableCell>$25,000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Aqua Filters</TableCell>
                      <TableCell>750</TableCell>
                      <TableCell>$37,500</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Eco Planters</TableCell>
                      <TableCell>300</TableCell>
                      <TableCell>$15,000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}


function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}


function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function LineChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  )
}


function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}


function PackageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}


function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}