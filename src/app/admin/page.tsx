"use client";

import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

const AdminPage = () => {
	const supabase = createClient();

	const { data: user } = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser();
			if (error) throw error;
			return user;
		},
	});

	return <div>{JSON.stringify(user)}</div>;
};

export default AdminPage;
