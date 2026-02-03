import initialData from '../data.json';
import { Thesis, User, ThesisStatus } from '../types';

// Keys for localStorage
const STORAGE_KEYS = {
    USERS: 'unithesis_users',
    THESES: 'unithesis_theses',
    TASKS: 'unithesis_tasks'
};

// Helper: Simulate Async Delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MockDb = {
    async initialize() {
        // Check if data exists in localStorage, if not, populate from JSON
        const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
        const storedTheses = localStorage.getItem(STORAGE_KEYS.THESES);

        if (!storedUsers) {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialData.users));
        }
        if (!storedTheses) {
            localStorage.setItem(STORAGE_KEYS.THESES, JSON.stringify(initialData.theses));
        }
        if (!localStorage.getItem(STORAGE_KEYS.TASKS)) {
            const defaultTasks = [
                { id: '1', title: 'Documentare bibliografică', deadline: '2023-11-15', completed: true },
                { id: '2', title: 'Definire arhitectură sistem', deadline: '2023-12-20', completed: false },
                { id: '3', title: 'Implementare prototip (MVP)', deadline: '2024-02-15', completed: false },
                { id: '4', title: 'Redactare Capitolul 1 & 2', deadline: '2024-03-01', completed: false },
            ];
            localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(defaultTasks));
        }
    },

    async getUsers(): Promise<User[]> {
        await delay(300);
        const data = localStorage.getItem(STORAGE_KEYS.USERS);
        return data ? JSON.parse(data) : [];
    },

    async getTheses(): Promise<Thesis[]> {
        await delay(300);
        const data = localStorage.getItem(STORAGE_KEYS.THESES);
        return data ? JSON.parse(data) : [];
    },

    async updateThesis(updatedThesis: Thesis): Promise<void> {
        await delay(200);
        const currentTheses = await this.getTheses();
        const newTheses = currentTheses.map(t => t.id === updatedThesis.id ? updatedThesis : t);
        localStorage.setItem(STORAGE_KEYS.THESES, JSON.stringify(newTheses));
    },

    // Specific Actions
    async applyToThesis(thesisId: string, userId: string): Promise<Thesis[]> {
        await delay(400);
        const currentTheses = await this.getTheses();
        const newTheses = currentTheses.map(t => {
            if (t.id === thesisId) {
                // avoid duplicates
                if (t.applicants?.includes(userId)) return t;
                return {
                    ...t,
                    applicants: [...(t.applicants || []), userId],
                    status: ThesisStatus.PENDING
                };
            }
            return t;
        });
        localStorage.setItem(STORAGE_KEYS.THESES, JSON.stringify(newTheses));
        return newTheses;
    },

    async acceptStudent(thesisId: string, studentId: string): Promise<Thesis[]> {
        await delay(400);
        const currentTheses = await this.getTheses();
        const newTheses = currentTheses.map(t => {
            if (t.id === thesisId) {
                return {
                    ...t,
                    status: ThesisStatus.TAKEN,
                    assignedStudentId: studentId,
                    applicants: [] // Clean up other applicants
                };
            }
            return t;
        });
        localStorage.setItem(STORAGE_KEYS.THESES, JSON.stringify(newTheses));
        return newTheses;
    },

    async rejectStudent(thesisId: string, studentId: string): Promise<Thesis[]> {
        await delay(400);
        const currentTheses = await this.getTheses();
        const newTheses = currentTheses.map(t => {
            if (t.id === thesisId) {
                return {
                    ...t,
                    applicants: t.applicants?.filter(id => id !== studentId)
                };
            }
            return t;
        });
        localStorage.setItem(STORAGE_KEYS.THESES, JSON.stringify(newTheses));
        return newTheses;
    },

    async addThesis(newThesis: Thesis): Promise<Thesis[]> {
        await delay(400);
        const currentTheses = await this.getTheses();
        const newTheses = [...currentTheses, newThesis];
        localStorage.setItem(STORAGE_KEYS.THESES, JSON.stringify(newTheses));
        return newTheses;
    },

    async updateUser(updatedUser: User): Promise<void> {
        await delay(300);
        const currentUsers = await this.getUsers();
        const newUsers = currentUsers.map(u => u.id === updatedUser.id ? updatedUser : u);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(newUsers));
    },

    async getTasks(): Promise<any[]> {
        await delay(300);
        const data = localStorage.getItem(STORAGE_KEYS.TASKS);
        return data ? JSON.parse(data) : [];
    },

    async updateTasks(newTasks: any[]): Promise<void> {
        await delay(300);
        localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(newTasks));
    },

    async acceptStudentProposal(thesisId: string, professorId: string, professorName: string): Promise<Thesis[]> {
        await delay(400);
        const currentTheses = await this.getTheses();
        const newTheses = currentTheses.map(t => {
            if (t.id === thesisId) {
                // If the teacher accepts, they become the professor and the student (applicant) is assigned
                const studentId = t.applicants && t.applicants.length > 0 ? t.applicants[0] : undefined;
                return {
                    ...t,
                    status: ThesisStatus.TAKEN,
                    professorId: professorId,
                    professorName: professorName,
                    assignedStudentId: studentId,
                    applicants: [] // Clear applicants as it's now taken
                };
            }
            return t;
        });
        localStorage.setItem(STORAGE_KEYS.THESES, JSON.stringify(newTheses));
        return newTheses;
    },

    async resetData(): Promise<void> {
        localStorage.removeItem(STORAGE_KEYS.USERS);
        localStorage.removeItem(STORAGE_KEYS.THESES);
        await this.initialize();
    }
};
