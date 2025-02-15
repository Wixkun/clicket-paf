"use client";

import { createClient } from "@/utils/supabase/client";
import { HistoireForm } from "@/components/histoire-form";
import Layout from "@/layout";

const AdminPage = () => {
	const supabase = createClient();

	// const { data: user } = useQuery({
	// 	queryKey: ["user"],
	// 	queryFn: async () => {
	// 		const {
	// 			data: { user },
	// 			error,
	// 		} = await supabase.auth.getUser();
	// 		if (error) throw error;
	// 		return user;
	// 	},
	// });

	// return <div>{JSON.stringify(user)}</div>;

	return (
		<Layout>
			<HistoireForm />
		</Layout>
	);
};

export default AdminPage;
