import { PrismaClient } from '@prisma/client';
import users from './users.json' assert { type: "json" };

const prisma = new PrismaClient();

export async function main() {
    console.log('[Elevator Music Cue] 🎸');
    for (const user of users) {
        await prisma.user.create({
            data: { ...user },
        });
    }
    console.log('Done 🎉');
}

main();
