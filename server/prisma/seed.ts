import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  // Create demo school
  const school = await prisma.school.upsert({
    where: { slug: 'demo-school' },
    update: {},
    create: {
      name: 'Demo Public School',
      slug: 'demo-school',
      address: '123 School Road',
      city: 'Nashik',
      state: 'Maharashtra',
      pincode: '422001',
      phone: '9876543210',
      email: 'school@demo.com',
      principalName: 'Dr. Rajesh Kumar',
      subscriptionPlan: 'growth',
      subscriptionExpiry: new Date('2026-03-31'),
    },
  });

  // Admin user
  await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      schoolId: school.id,
      name: 'School Admin',
      email: 'admin@demo.com',
      password: passwordHash,
      role: 'SCHOOL_ADMIN',
    },
  });

  // Teacher
  await prisma.user.upsert({
    where: { email: 'teacher@demo.com' },
    update: {},
    create: {
      schoolId: school.id,
      name: 'Priya Sharma',
      email: 'teacher@demo.com',
      password: passwordHash,
      role: 'TEACHER',
    },
  });

  // Student user
  await prisma.user.upsert({
    where: { email: 'student@demo.com' },
    update: {},
    create: {
      schoolId: school.id,
      name: 'Rahul Mehta',
      email: 'student@demo.com',
      password: passwordHash,
      role: 'STUDENT',
    },
  });

  // Demo students
  const students = [
    { rollNumber: '2024001', name: 'Aarav Singh', class: '10', section: 'A', gender: 'MALE', dateOfBirth: new Date('2008-04-15'), parentName: 'Rajesh Singh', parentPhone: '9876001234', admissionDate: new Date('2021-06-01') },
    { rollNumber: '2024002', name: 'Priya Patel', class: '10', section: 'A', gender: 'FEMALE', dateOfBirth: new Date('2008-07-22'), parentName: 'Suresh Patel', parentPhone: '9876005678', admissionDate: new Date('2021-06-01') },
    { rollNumber: '2024003', name: 'Rohan Kumar', class: '10', section: 'B', gender: 'MALE', dateOfBirth: new Date('2008-02-11'), parentName: 'Anil Kumar', parentPhone: '9876009012', admissionDate: new Date('2022-06-01') },
  ];

  for (const s of students) {
    await prisma.student.upsert({
      where: { schoolId_rollNumber: { schoolId: school.id, rollNumber: s.rollNumber } },
      update: {},
      create: { ...s, schoolId: school.id, gender: s.gender as never },
    });
  }

  // Grading scale
  await prisma.gradingScale.upsert({
    where: { id: `${school.id}-default` },
    update: {},
    create: {
      id: `${school.id}-default`,
      schoolId: school.id,
      name: 'CBSE Standard',
      isDefault: true,
      bands: [
        { grade: 'A+', min: 91, max: 100 },
        { grade: 'A', min: 81, max: 90 },
        { grade: 'B+', min: 71, max: 80 },
        { grade: 'B', min: 61, max: 70 },
        { grade: 'C', min: 51, max: 60 },
        { grade: 'D', min: 33, max: 50 },
        { grade: 'F', min: 0, max: 32 },
      ],
    },
  });

  console.log('Seed complete. Login with:');
  console.log('  Admin:   admin@demo.com / password123  (school: demo-school)');
  console.log('  Teacher: teacher@demo.com / password123');
  console.log('  Student: student@demo.com / password123');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
