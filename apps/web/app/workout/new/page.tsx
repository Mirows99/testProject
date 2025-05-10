"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import { Card, CardHeader, CardContent, CardFooter } from "@repo/ui/components/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";

// Define types for our workout data
interface ExerciseSet {
  weight: string;
  reps: string;
}

interface Exercise {
  name: string;
  sets: ExerciseSet[];
}

interface WorkoutData {
  name: string;
  type: string;
  date: string;
  notes: string;
  exercises: Exercise[];
}

export default function NewWorkoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [workoutData, setWorkoutData] = useState<WorkoutData>({
    name: "",
    type: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
    exercises: [{ name: "", sets: [{ weight: "", reps: "" }] }]
  });

  const workoutTypes = [
    "Strength", "Cardio", "Flexibility", "HIIT", "Calisthenics"
  ];

  const handleAddExercise = () => {
    setWorkoutData({
      ...workoutData,
      exercises: [...workoutData.exercises, { name: "", sets: [{ weight: "", reps: "" }] }]
    });
  };

  const handleRemoveExercise = (index: number) => {
    const newExercises = [...workoutData.exercises];
    newExercises.splice(index, 1);
    setWorkoutData({
      ...workoutData,
      exercises: newExercises
    });
  };

  const handleAddSet = (exerciseIndex: number) => {
    const newExercises = [...workoutData.exercises];
    if (newExercises[exerciseIndex]) {
      newExercises[exerciseIndex].sets.push({ weight: "", reps: "" });
      setWorkoutData({
        ...workoutData,
        exercises: newExercises
      });
    }
  };

  const handleRemoveSet = (exerciseIndex: number, setIndex: number) => {
    const newExercises = [...workoutData.exercises];
    if (newExercises[exerciseIndex] && newExercises[exerciseIndex].sets) {
      newExercises[exerciseIndex].sets.splice(setIndex, 1);
      setWorkoutData({
        ...workoutData,
        exercises: newExercises
      });
    }
  };

  const handleExerciseChange = (exerciseIndex: number, field: keyof Exercise, value: string) => {
    const newExercises = [...workoutData.exercises];
    if (newExercises[exerciseIndex] && field === 'name') {
      newExercises[exerciseIndex].name = value;
      setWorkoutData({
        ...workoutData,
        exercises: newExercises
      });
    }
  };

  const handleSetChange = (exerciseIndex: number, setIndex: number, field: keyof ExerciseSet, value: string) => {
    const newExercises = [...workoutData.exercises];
    if (newExercises[exerciseIndex] && 
        newExercises[exerciseIndex].sets && 
        newExercises[exerciseIndex].sets[setIndex]) {
      newExercises[exerciseIndex].sets[setIndex][field] = value;
      setWorkoutData({
        ...workoutData,
        exercises: newExercises
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement actual workout submission logic
    // This is just a placeholder for now
    setTimeout(() => {
      console.log("Workout data:", workoutData);
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">New Workout</h1>
        <Link href="/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">Workout Details</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Workout Name
                </label>
                <Input
                  id="name"
                  value={workoutData.name}
                  onChange={(e) => setWorkoutData({ ...workoutData, name: e.target.value })}
                  placeholder="E.g., Morning Strength Training"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="type" className="block text-sm font-medium">
                  Workout Type
                </label>
                <Select
                  value={workoutData.type}
                  onValueChange={(value) => setWorkoutData({ ...workoutData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a workout type" />
                  </SelectTrigger>
                  <SelectContent>
                    {workoutTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="date" className="block text-sm font-medium">
                Date
              </label>
              <Input
                id="date"
                type="date"
                value={workoutData.date}
                onChange={(e) => setWorkoutData({ ...workoutData, date: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="notes" className="block text-sm font-medium">
                Notes
              </label>
              <Textarea
                id="notes"
                value={workoutData.notes}
                onChange={(e) => setWorkoutData({ ...workoutData, notes: e.target.value })}
                placeholder="Any additional notes about this workout..."
                className="h-24"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-xl font-semibold">Exercises</h2>
            <Button type="button" onClick={handleAddExercise} variant="outline" size="sm">
              Add Exercise
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {workoutData.exercises.map((exercise, exerciseIndex) => (
              <div key={exerciseIndex} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Exercise {exerciseIndex + 1}</h3>
                  {workoutData.exercises.length > 1 && (
                    <Button 
                      type="button" 
                      onClick={() => handleRemoveExercise(exerciseIndex)} 
                      variant="destructive" 
                      size="sm"
                    >
                      Remove
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Exercise Name
                  </label>
                  <Input
                    value={exercise.name}
                    onChange={(e) => handleExerciseChange(exerciseIndex, "name", e.target.value)}
                    placeholder="E.g., Bench Press, Squat, etc."
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium">Sets</label>
                    <Button 
                      type="button" 
                      onClick={() => handleAddSet(exerciseIndex)} 
                      variant="outline" 
                      size="sm"
                    >
                      Add Set
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {exercise.sets.map((set, setIndex) => (
                      <div key={setIndex} className="flex items-center gap-2">
                        <div className="w-12 text-center">
                          <span className="text-sm font-medium">{setIndex + 1}</span>
                        </div>
                        <Input
                          value={set.weight}
                          onChange={(e) => handleSetChange(exerciseIndex, setIndex, "weight", e.target.value)}
                          placeholder="Weight"
                          className="flex-1"
                        />
                        <Input
                          value={set.reps}
                          onChange={(e) => handleSetChange(exerciseIndex, setIndex, "reps", e.target.value)}
                          placeholder="Reps"
                          className="flex-1"
                        />
                        {exercise.sets.length > 1 && (
                          <Button 
                            type="button" 
                            onClick={() => handleRemoveSet(exerciseIndex, setIndex)} 
                            variant="ghost" 
                            size="sm"
                          >
                            ✕
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <div className="flex justify-end gap-4">
          <Link href="/dashboard">
            <Button type="button" variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Workout"}
          </Button>
        </div>
      </form>
    </div>
  );
} 