import prisma from "@/lib/prisma";

export default async function GetAllStudents() {
  const users = await prisma.student.findMany();
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center -mt-16">
    
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        {users.map((user) => (
          <li key={user.id} className="mb-2 text-black font-bold text-2xl p-4">
            {user.name}
          </li>
        ))}
      </ol>
    </div>
  );
}