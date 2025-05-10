"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@repo/ui/components/button";
import { Card, CardHeader, CardContent } from "@repo/ui/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/tabs";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Example workout data
  const recentWorkouts = [
    { id: 1, name: "Upper Body", date: "2023-05-10", duration: "45 min" },
    { id: 2, name: "Lower Body", date: "2023-05-08", duration: "60 min" },
    { id: 3, name: "Cardio", date: "2023-05-05", duration: "30 min" },
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <Link href="/workout/new">
            <Button>New Workout</Button>
          </Link>
          <Button variant="outline">My Profile</Button>
        </div>
      </header>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workouts">Workouts</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Total Workouts</h3>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">24</p>
                <p className="text-sm text-gray-500">Last 30 days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Workout Time</h3>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">16.5h</p>
                <p className="text-sm text-gray-500">Last 30 days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Active Streak</h3>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">5 days</p>
                <p className="text-sm text-gray-500">Keep it up!</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Recent Workouts</h3>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-2">Name</th>
                      <th className="text-left pb-2">Date</th>
                      <th className="text-left pb-2">Duration</th>
                      <th className="text-right pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentWorkouts.map((workout) => (
                      <tr key={workout.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="py-3">{workout.name}</td>
                        <td className="py-3">{workout.date}</td>
                        <td className="py-3">{workout.duration}</td>
                        <td className="py-3 text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="workouts">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Your Workout History</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">View and manage all your past workouts here. Coming soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Progress Tracking</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Track your progress over time. Coming soon!</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 