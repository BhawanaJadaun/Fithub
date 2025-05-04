import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../server.js';

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

  const handleReply = async (email) => {
    try {
      await axios.post(`${API_URL}/enquiry/reply`, {
        email,
        message: replyText
      });
      alert("Reply sent!");
      setReplyText("");
      setActiveReplyId(null);
    } catch (error) {
      alert("Failed to send reply.");
    }
  };

  return (
    <div className="ml-64 p-6 min-h-screen bg-gradient-to-br from-second to-second">
      <h2 className="text-4xl font-semibold mb-8 text-center text-six">User Enquiries</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-second border border-first rounded-xl shadow-md">
          <thead>
            <tr className="bg-first text-left text-default text-sm font-medium">
              <th className="p-3 border-b border-r">Image</th>
              <th className="p-3 border-b border-r">Name</th>
              <th className="p-3 border-b border-r">Email</th>
              <th className="p-3 border-b border-r">Message</th>
              <th className="p-3 border-b border-r">Location</th>
              <th className="p-3 border-b border-r">Date</th>
              <th className="p-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((e) => (
              <tr key={e._id} className="even:bg-third hover:bg-third transition-all border-t relative">
                <td className="p-3 border-r">
                  {e.image ? (
                    <img src={e.image} alt={e.name} width="40" height="40" className="rounded-full" />
                  ) : (
                    <span className="text-default italic">No image</span>
                  )}
                </td>
                <td className="p-3 border-r text-default">{e.name}</td>
                <td className="p-3 border-r text-six">{e.email}</td>
                <td className="p-3 border-r text-default">{e.message}</td>
                <td className="p-3 border-r text-six">{e.location}</td>
                <td className="p-3 border-r text-default">{new Date(e.createdAt).toLocaleString()}</td>
                <td className="p-3 relative">
                  <button
                    onClick={() => setActiveReplyId(activeReplyId === e._id ? null : e._id)}
                    className="text-2xl px-4 text-six"
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
                      <div className="flex justify-end gap-2 mt-3">
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
                          className="bg-six text-default px-3 py-1 rounded hover:bg-first text-sm"
                          onClick={() => handleReply(e.email)}
                        >
                          Send
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
