import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../server.js';
import { toast } from "react-toastify";

const EnquiryPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchEnquiries = async () => {
      if (ignore) return;
      const { data } = await axios.get(`${API_URL}/enquiry/enquiries`);
      setEnquiries(data);
    };

    fetchEnquiries();
    return () => {
      ignore = true;
    };
  }, []);

  const handleReply = async (userEmail) => {
    const adminId = localStorage.getItem("adminId");

    if (!adminId) {
      alert("Admin ID not found!");
      return;
    }

    try {
      await axios.post(`${API_URL}/enquiry/reply`, {
        adminId,
        email: userEmail,
        message: replyText,
      });

      toast.success("Reply sent!");
      setReplyText("");
      setActiveReplyId(null);
    } catch (error) {
      console.error("Reply failed:", error.response?.data || error.message);
      toast.error("Failed to send reply.");
    }
  };

  const handleReplyViaEmail = (userEmail) => {
    const subject = "Reply to your enquiry";
    const body = "Type your reply here...";

    // Open the default email client
    window.location.href = `mailto:${userEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="ml-0 lg:ml-64 px-4 sm:px-6 py-6 min-h-screen bg-gradient-to-br from-second to-second">
  <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-center text-six">User Enquiries</h2>

  <div className="overflow-x-auto">
    <table className="min-w-full bg-second border border-first rounded-xl shadow-md text-sm">
      <thead>
        <tr className="bg-first text-left text-default font-medium">
          <th className="p-3 border-b border-r whitespace-nowrap">Image</th>
          <th className="p-3 border-b border-r whitespace-nowrap">Name</th>
          <th className="p-3 border-b border-r whitespace-nowrap">Email</th>
          <th className="p-3 border-b border-r whitespace-nowrap">Message</th>
          <th className="p-3 border-b border-r whitespace-nowrap">Location</th>
          <th className="p-3 border-b border-r whitespace-nowrap">Date</th>
          <th className="p-3 border-b whitespace-nowrap">Action</th>
        </tr>
      </thead>
      <tbody>
        {enquiries.map((e) => (
          <tr key={e._id} className="even:bg-third hover:bg-third transition-all border-t relative">
            <td className="p-3 border-r">
              {e.image ? (
                <img src={e.image} alt={e.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <span className="text-default italic">No image</span>
              )}
            </td>
            <td className="p-3 border-r text-default">{e.name}</td>
            <td className="p-3 border-r text-six break-words max-w-[150px]">{e.email}</td>
            <td className="p-3 border-r text-default break-words max-w-[200px]">{e.message}</td>
            <td className="p-3 border-r text-six">{e.location}</td>
            <td className="p-3 border-r text-default whitespace-nowrap">{new Date(e.createdAt).toLocaleString()}</td>
            <td className="p-3 relative">
              <button
                onClick={() => setActiveReplyId(activeReplyId === e._id ? null : e._id)}
                className="text-xl px-4 text-six"
              >
                ⋮
              </button>

              {activeReplyId === e._id && (
                <div className="absolute right-0 top-12 bg-third border border-first shadow-lg p-4 z-10 w-72 rounded-lg">
                  <textarea
                    className="w-full border border-third rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-third bg-second text-default"
                    rows={3}
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="flex flex-col sm:flex-row justify-end gap-2 mt-3">
                    <button
                      className="bg-red-600 text-default px-3 py-1 rounded hover:bg-orange-500 text-sm"
                      onClick={() => {
                        setReplyText("");
                        setActiveReplyId(null);
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      className="bg-first text-white px-3 py-1 rounded hover:bg-third text-sm"
                      onClick={() => handleReplyViaEmail(e.email)}
                    >
                      Reply via Email
                    </button>
                  </div>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default EnquiryPage;
