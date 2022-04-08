import { Timestamp } from "mongodb";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req, res) {
	const { method, body } = req;
	const { db } = await connectToDatabase();

	const session = await getSession({ req });

	if (!session) {
		res.status(401).json({ error: "Unauthenticated User" });
	} else {
		if (method === "GET") {
			try {
				const posts = await db
					.collection("posts")
					// .find({ email: session.user.email })
					.find()
					.sort({ timestamp: -1 })
					.toArray();

				res.status(200).json(posts);
			} catch (error) {
				res.status(500).status(error);
			}
		}

		if (method === "POST") {
			try {
				const post = await db
					.collection("posts")
					.insertOne({ ...body, timestamp: new Timestamp() });

				res.status(201).json(post);
			} catch (error) {
				res.status(500).status(error);
			}
		}
	}
}
