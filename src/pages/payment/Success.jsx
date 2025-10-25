import React, { useEffect, useState, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Success = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const [paymentConfirmed, setPaymentConfirmed] = useState(null); // initially null
  const hasProcessedPayment = useRef(false);

  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get("session_id");

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: () =>
      axiosInstance.get(`/users/${username}`).then((res) => res.data),
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: async (updatedData) => {
      await axiosInstance.put("/users/profile", updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
    },
  });

  // 🚫 Redirect to "/" if payment is not confirmed
  useEffect(() => {
    if (paymentConfirmed === false) {
      const timeout = setTimeout(() => {
        navigate('/');
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [paymentConfirmed, navigate]);

  useEffect(() => {
    const verifySession = async () => {
      if (!sessionId || !authUser) return;
      if (hasProcessedPayment.current) return;

      hasProcessedPayment.current = true;

      try {
        const { data } = await axiosInstance.get(`/stripe/session/${sessionId}`);
        if (data.session.payment_status === "paid") {
          setPaymentConfirmed(true);

          const updatedCredit = authUser.credit + 50;

          queryClient.setQueryData(["authUser"], (oldData) => ({
            ...oldData,
            credit: updatedCredit,
          }));

          updateProfile({ credit: updatedCredit });

          toast.success(`Payment successful. You now have ${updatedCredit} credits.`);

          setTimeout(() => navigate("/"), 3000);
        } else {
          setPaymentConfirmed(false);
          toast.error("Payment not confirmed.");
        }
      } catch (error) {
        setPaymentConfirmed(false);
        toast.error("Could not verify payment session.");
        console.error("Session error", error);
      }
    };

    verifySession();
  }, [sessionId, authUser, navigate, queryClient, updateProfile]);

return (
  <div className="flex items-center justify-center h-[80vh]">
    <div className="bg-[#FBF5E2] rounded-lg shadow p-30 border-black border-2">
      <h1 className="mb-2 text-sm text-center">
        Credits: {authUser?.credit ?? 0}
      </h1>
      {paymentConfirmed === false && (
        <p className="text-red-500 text-sm mt-2">Verifying payment...</p>
      )}
    </div>
  </div>
);

};

export default Success;
