import { useGetAllPaymentsQuery } from "../redux/api/paymentApiSlice";

const Dashboard = () => {
  const { data, isLoading } = useGetAllPaymentsQuery();

  return (
    <section className="flex justify-center items-center h-[calc(100vh-48px)]">
      <div className="max-w-[500px] bg-white p-10 w-[90%] rounded-2xl flex flex-col gap-4 text-black">
        {isLoading ? (
          <p>Loading...</p>
        ) : Array.isArray(data) && data.length > 0 ? (
          <div className="flex flex-col gap-4">
            <p className="text-2xl">Your Donations</p>
            {data.map((donation) => (
              <div key={donation._id} className="h-10 rounded border border-black/50 flex items-center justify-between px-10">
                <p className="text-base">Rs. {donation.amount}</p>
                <p className="text-base">{new Date(donation.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No Donation History</p>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
