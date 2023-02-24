import { useStepperContext } from "../contexts/StepperContext";

export default function Payment({onSubmit}) {
  const { userData, setUserData } = useStepperContext();


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    localStorage.setItem('registerData', userData);
    console.log(`account user data: ${userData['username']} ${JSON.stringify(userData)}`);
    localStorage.setItem('registerData', JSON.stringify(userData));
  };
  return (
    <div className="flex flex-col ">
       <form className="mt-0 space-y-6 mx-0" onSubmit={handleSubmit}>
      <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" for="storeName">
                  Company Name
                </label>
                <input
                  id="storeName"
                  name="storeName"
                  type="text"
                  // ref={userRef} 
                  autoComplete="off"
                  onChange={handleChange}
                  value={userData["storeName"] || ""}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="My Company"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" for="city">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  // ref={userRef} 
                  autoComplete="off"
                  onChange={handleChange}
                  value={userData["city"] || ""}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="New York"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" for="country">
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  // ref={userRef} 
                  autoComplete="off"
                  onChange={handleChange}
                  value={userData["country"] || ""}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="United States"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" for="description">
                  Description
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  // ref={userRef} 
                  autoComplete="off"
                  onChange={handleChange}
                  value={userData["description"] || ""}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="About your company"
                />
              </div>
      </form>
    </div>
  );
}
