"use server"

import prisma from "@/lib/database";

export async function addOrUpdateVisitor(ip: string, location: any) {

    const existingVisitor = await prisma.visitor.findFirst({
        where: {
            ip,
        }
    });

    await prisma.visitor.upsert({
        where: { id: existingVisitor?.id || "" },
        update: {
            visits: { increment: 1 },
            refresh: { increment: 1 }
        },
        create: {
            ip: ip,
            location: location,
            visits: 1,
            refresh: 0
        }
    });
}

export async function getVisitorInfo() {
    try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipResponse.json();
        const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
        const location = await locationResponse.json();
        return { ip, location };
    } catch (error) {
        console.error("Error getting visitor info:", error);
        return { ip: null, location: null };
    }
}