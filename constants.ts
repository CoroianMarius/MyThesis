import { Thesis, ThesisStatus, ThesisType, User, UserRole } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 's1',
    name: 'Andrei Popescu',
    email: 'andrei.popescu@e-uvt.ro',
    role: UserRole.STUDENT,
    avatar: 'https://picsum.photos/200/200?random=1',
    bio: 'Student pasionat de AI și Web Development. Caut o temă provocatoare.',
    interests: ['React', 'Machine Learning', 'Cloud Computing'],
    department: 'Informatică'
  },
  {
    id: 't1',
    name: 'Prof. Dr. Elena Ionescu',
    email: 'elena.ionescu@e-uvt.ro',
    role: UserRole.TEACHER,
    avatar: 'https://picsum.photos/200/200?random=2',
    bio: 'Cercetător în sisteme distribuite și securitate cibernetică.',
    interests: ['Cybersecurity', 'Blockchain', 'IoT'],
    department: 'Informatică'
  }
];

export const MOCK_THESES: Thesis[] = [
  {
    id: 'th1',
    title: 'Utilizarea AI în detecția anomaliilor financiare',
    description: 'Această lucrare propune dezvoltarea unui model de ML pentru a identifica fraudele bancare în timp real.',
    professorId: 't1',
    professorName: 'Prof. Dr. Elena Ionescu',
    type: ThesisType.LICENSE,
    department: 'Informatică',
    tags: ['AI', 'FinTech', 'Python'],
    status: ThesisStatus.AVAILABLE,
    applicants: []
  },
  {
    id: 'th2',
    title: 'Platformă descentralizată de votare folosind Blockchain',
    description: 'Studiu și implementare a unui sistem de vot electronic securizat pe Ethereum.',
    professorId: 't1',
    professorName: 'Prof. Dr. Elena Ionescu',
    type: ThesisType.MASTER,
    department: 'Informatică',
    tags: ['Blockchain', 'Solidity', 'Security'],
    status: ThesisStatus.AVAILABLE,
    applicants: ['s1']
  },
  {
    id: 'th3',
    title: 'Optimizarea traficului urban folosind algoritmi genetici',
    description: 'Simularea intersecțiilor inteligente într-un oraș aglomerat.',
    professorId: 't2', // Imagine another prof
    professorName: 'Lect. Dr. Mihai Radu',
    type: ThesisType.LICENSE,
    department: 'Informatică',
    tags: ['Algorithms', 'Simulation', 'Traffic'],
    status: ThesisStatus.AVAILABLE,
    applicants: []
  }
];
