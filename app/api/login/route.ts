import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        // Mock user
        const mockUser = {
            email: "test@test.com",
            password: "123456",
        };

        // Sprawdzenie danych
        if (email !== mockUser.email || password !== mockUser.password) {
            return NextResponse.json(
                { success: false, error: "Nieprawidłowy email lub hasło" },
                { status: 401 }
            );
        }

        return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Błąd serwera" },
            { status: 500 }
        );
    }
}
