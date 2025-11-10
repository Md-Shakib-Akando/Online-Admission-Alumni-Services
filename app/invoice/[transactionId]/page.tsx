"use client";
import { useParams } from "next/navigation";
import logo from "../../../public/assets/pundra varsity logo.png"
import Image from "next/image";
export default function InvoicePage() {
    const { transactionId } = useParams();

    const handleDownload = () => {
        const element = document.getElementById("invoice");
        if (!element) return;

        const newWindow = window.open();
        newWindow?.document.write(`
            <html>
                <head>
                    <title>Invoice - Online Admission</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .invoice-box {
                            max-width: 800px;
                            margin: auto;
                            padding: 30px;
                            border: 1px solid #eee;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                            line-height: 24px;
                            font-size: 16px;
                            color: #555;
                        }
                        .invoice-box table {
                            width: 100%;
                            line-height: inherit;
                            text-align: left;
                            border-collapse: collapse;
                        }
                        .invoice-box table td {
                            padding: 8px;
                            vertical-align: top;
                        }
                        .invoice-box table tr.heading td {
                            background: #0ea5e9;
                            color: #fff;
                            font-weight: bold;
                        }
                        .invoice-box table tr.item td {
                            border-bottom: 1px solid #eee;
                        }
                        .title {
                            font-size: 24px;
                            font-weight: bold;
                            color: #0ea5e9;
                        }
                        .header-logo {
                            width: 80px;
                            height: 80px;
                            object-fit: contain;
                        }
                        .text-center {
                            text-align: center;
                        }
                    </style>
                </head>
                <body>${element.outerHTML}</body>
            </html>
        `);
        newWindow?.print();
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
            <div
                id="invoice"
                className="invoice-box border rounded-lg p-6"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <div className="flex items-center gap-3">
                        <Image
                            src={logo}
                            alt="University Logo"
                            className="w-16 h-16"
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-sky-600">
                                Your University Name
                            </h1>
                            <p className="text-gray-600 text-sm">
                                Online Admission Payment Invoice
                            </p>
                        </div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                        <p>Date: {new Date().toLocaleDateString()}</p>
                        <p>Invoice No: #{transactionId?.slice(-6)}</p>

                    </div>
                </div>


                <div className="mb-4">
                    <h2 className="text-lg font-semibold border-b pb-1 mb-2 text-gray-700">
                        Student Information
                    </h2>
                    <p>
                        <strong>Name:</strong> John Doe
                    </p>
                    <p>
                        <strong>Student ID:</strong> 202500123
                    </p>
                    <p>
                        <strong>Program:</strong> Bachelor of Computer Science
                    </p>
                </div>

                {/* Payment Details */}
                <table className="w-full text-sm border">
                    <thead>
                        <tr className="bg-sky-500 text-white">
                            <th className="p-2 border">Description</th>
                            <th className="p-2 border">Transaction ID</th>
                            <th className="p-2 border">Amount (USD)</th>
                            <th className="p-2 border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-center border-b">
                            <td className="p-2 border">Admission Fee Payment</td>
                            <td className="p-2 border text-sky-600 font-medium">{transactionId}</td>
                            <td className="p-2 border font-semibold text-green-600">$50.00</td>
                            <td className="p-2 border text-green-600 font-semibold">Paid</td>
                        </tr>
                    </tbody>
                </table>

                {/* Footer Note */}
                <div className="text-sm text-gray-600 mt-6 border-t pt-3 text-center">
                    <p>Thank you for completing your payment successfully.</p>
                    <p className="text-gray-500">
                        This invoice is system-generated and does not require a signature.
                    </p>
                </div>
            </div>

            {/* Download Button */}
            <div className="text-center mt-6">
                <button
                    onClick={handleDownload}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg"
                >
                    Download Invoice
                </button>
            </div>
        </div>
    );
}
