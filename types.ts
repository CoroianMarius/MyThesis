export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

export enum ThesisType {
  LICENSE = 'LICENTA',
  MASTER = 'DISERTATIE',
  PHD = 'DOCTORAT'
}

export enum ThesisStatus {
  AVAILABLE = 'DISPONIBIL',
  PENDING = 'IN_ASTEPTARE', // Student applied
  TAKEN = 'OCUPAT' // Matched
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio?: string;
  interests?: string[];
  department?: string;
}

export interface Thesis {
  id: string;
  title: string;
  description: string;
  professorId: string;
  professorName: string;
  type: ThesisType;
  department: string;
  tags: string[];
  status: ThesisStatus;
  applicants?: string[]; // IDs of students who applied
  assignedStudentId?: string;
}

export interface Task {
  id: string;
  title: string;
  deadline: string;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

export interface Document {
  id: string;
  name: string;
  date: string;
  type: 'PDF' | 'DOCX' | 'OTHER';
}
