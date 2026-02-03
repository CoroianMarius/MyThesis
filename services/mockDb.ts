import initialData from '../data.json';
import { Thesis, User, ThesisStatus } from '../types';

// Keys for localStorage
const STORAGE_KEYS = {
    USERS: 'unithesis_users',
    THESES: 'unithesis_theses'
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

    async resetData(): Promise<void> {
        localStorage.removeItem(STORAGE_KEYS.USERS);
        localStorage.removeItem(STORAGE_KEYS.THESES);
        await this.initialize();
    }
};
