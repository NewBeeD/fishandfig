

const DeliveryNotice = () => {
  return (
    <div className="mb-6 rounded-md border-l-4 border-blue-500 bg-blue-50 p-4 text-xl text-blue-800">
      <h2 className="text-lg font-bold mb-2">
        📦 Delivery Schedule Notice
      </h2>

      <p>
        We deliver on <strong className="font-semibold">Tuesdays, Thursdays, and Sundays</strong>.
      </p>

      <ul className="list-disc pl-6 mt-2 space-y-1">
        <li>
          Orders placed on <strong className="font-semibold">Sunday</strong> or <strong className="font-semibold">Monday</strong> will be delivered on <strong className="font-semibold">Tuesday</strong>.
        </li>
        <li>
          Orders placed on <strong className="font-semibold">Tuesday</strong> or <strong className="font-semibold">Wednesday</strong> will be delivered on <strong className="font-semibold">Thursday</strong>.
        </li>
        <li>
          Orders placed on <strong className="font-semibold">Thursday</strong>, <strong className="font-semibold">Friday</strong>, or <strong className="font-semibold">Saturday</strong> will be delivered on <strong className="font-semibold">Sunday</strong>.
        </li>
      </ul>

      <p className="mt-4">
        🕒 Please keep this in mind when placing your order. Contact our support team if you need assistance.
      </p>
    </div>
  );
}

export default DeliveryNotice;