import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextResponse) => {
  const tag: string = req.url.split("/getPlayerNextChests/")[1];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_CR_BASE_URL;
    const token = process.env.NEXT_PUBLIC_CR_ACCESS_KEY;
    console.log(baseUrl, token);
    const res = await fetch(`${baseUrl}/players/%23${tag}/upcomingchests`, {
      headers: {
        "cache-control": "max-age=60",
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      return NextResponse.json(
        {
          message: "Success",
          chests: await res.json(),
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Error", error: res.json() },
        { status: res.status }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
