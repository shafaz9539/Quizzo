export interface QuizRequestBody {
    title: string;
    description: string;
    teacherId: Number;
}

export interface QuizRequestParams {
    id: number;
    teacherId: number;
}