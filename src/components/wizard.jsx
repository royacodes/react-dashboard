import React from "react";

export default function Wizard() {

    return (
        <div>
            <div class="flex mt-16 mx-36 ">
                <div class="w-1/3 text-center px-6 ">
                    <div class="bg-gray-300 rounded-lg flex items-center justify-center border border-gray-200 ">
                        <div class="w-1/3 bg-transparent h-20 flex items-center justify-center icon-step">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.995 24h-1.995c0-3.104.119-3.55-1.761-3.986-2.877-.664-5.594-1.291-6.584-3.458-.361-.791-.601-2.095.31-3.814 2.042-3.857 2.554-7.165 1.403-9.076-1.341-2.229-5.413-2.241-6.766.034-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 4.983 0 8.451 4.766 3.732 13.678-1.551 2.928 1.65 3.624 5.09 4.418 2.979.688 3.178 2.143 3.178 4.663l-.005 1.241zm-13.478-6l.91 2h1.164l.92-2h-2.994zm2.995 6l-.704-3h-1.615l-.704 3h3.023z" /></svg>
                        </div>
                        <div class="w-2/3 bg-gray-200 h-24 flex flex-col items-center justify-center px-1 rounded-r-lg body-step">
                            <h2 class="font-bold text-base">Sign Up</h2>
                            {/* <p class="text-xs text-gray-600">
                  Just your personal information
                </p> */}
                        </div>
                    </div>
                </div>
                <div class="flex-1 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 2h-7.229l7.014 7h-13.785v6h13.785l-7.014 7h7.229l10-10z" /></svg>
                </div>
                <div class="w-1/3 text-center px-6">
                    <div class="bg-gray-300 rounded-lg flex items-center justify-center border border-gray-200">
                        <div class="w-1/3 bg-transparent h-20 flex items-center justify-center icon-step">
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-4 13v1h-4v-1h4zm-6.002 1h-10.997l-.001-.914c-.004-1.05-.007-2.136 1.711-2.533.789-.182 1.753-.404 1.892-.709.048-.108-.04-.301-.098-.407-1.103-2.036-1.305-3.838-.567-5.078.514-.863 1.448-1.359 2.562-1.359 1.105 0 2.033.488 2.545 1.339.737 1.224.542 3.033-.548 5.095-.057.106-.144.301-.095.41.14.305 1.118.531 1.83.696 1.779.41 1.773 1.503 1.767 2.56l-.001.9zm-9.998-1h8.999c.003-1.014-.055-1.27-.936-1.473-1.171-.27-2.226-.514-2.57-1.267-.174-.381-.134-.816.119-1.294.921-1.739 1.125-3.199.576-4.111-.332-.551-.931-.855-1.688-.855-.764 0-1.369.31-1.703.871-.542.91-.328 2.401.587 4.09.259.476.303.912.13 1.295-.342.757-1.387.997-2.493 1.252-.966.222-1.022.478-1.021 1.492zm18-3v1h-6v-1h6zm0-3v1h-6v-1h6zm0-3v1h-6v-1h6z" /></svg>
                        </div>
                        <div class="w-2/3 bg-gray-200 h-24 flex flex-col items-center justify-center px-1 rounded-r-lg body-step">
                            <h2 class="font-bold text-base">Sign In</h2>
                            {/* <p class="text-xs text-gray-600">
                  Anything you want for your credentials
                </p> */}
                        </div>
                    </div>
                </div>
                <div class="flex-1 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 2h-7.229l7.014 7h-13.785v6h13.785l-7.014 7h7.229l10-10z" /></svg>
                </div>
                <div class="w-1/3 text-center px-6">
                    <div class="bg-gray-300 rounded-lg flex items-center justify-center border border-gray-200">
                        <div class="w-1/3 bg-transparent h-20 flex items-center justify-center icon-step">
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                height="24"
                                width="24"
                            >
                                <path d="M17.8 19c-.4-1.2-1.5-2-2.8-2-1.7 0-3 1.3-3 3s1.3 3 3 3c1.3 0 2.4-.8 2.8-2H19v2h2v-2h2v-2h-5.2M15 21.3c-.7 0-1.3-.6-1.3-1.3s.6-1.3 1.3-1.3 1.3.6 1.3 1.3-.6 1.3-1.3 1.3M9 10h5v2H9v-2m0-4h5v2H9V6M7 5c0-.6.4-1 1-1h8v11.1c.7.2 1.4.5 2 .9V5c0-.6.4-1 1-1s1 .4 1 1v1h2V5c0-1.7-1.3-3-3-3H8C6.3 2 5 3.3 5 5v11h2V5m3 15c0-.7.1-1.4.4-2H2v1c0 1.7 1.3 3 3 3h5.4c-.3-.6-.4-1.3-.4-2m-1-4h3c.6-.4 1.3-.8 2-.9V14H9v2z" />
                            </svg>              </div>
                        <div class="w-2/3 bg-gray-200 h-24 flex flex-col items-center justify-center px-1 rounded-r-lg body-step">
                            <h2 class="font-bold text-base">API Key</h2>
                            {/* <p class="text-xs text-gray-600">
                  Finish it!
                </p> */}
                        </div>
                    </div>
                </div>
                <div class="flex-1 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 2h-7.229l7.014 7h-13.785v6h13.785l-7.014 7h7.229l10-10z" /></svg>
                </div>
                <div class="w-1/3 text-center px-6">
                    <div class="bg-gray-300 rounded-lg flex items-center justify-center border border-gray-200">
                        <div class="w-1/3 bg-transparent h-20 flex items-center justify-center icon-step">
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                height="24"
                                width="24"
                            >
                                <path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-2.28A2 2 0 0022 15V9a2 2 0 00-1-1.72V5a2 2 0 00-2-2H5m0 2h14v2h-6a2 2 0 00-2 2v6a2 2 0 002 2h6v2H5V5m8 4h7v6h-7V9m3 1.5a1.5 1.5 0 00-1.5 1.5 1.5 1.5 0 001.5 1.5 1.5 1.5 0 001.5-1.5 1.5 1.5 0 00-1.5-1.5z" />
                            </svg>
                        </div>
                        <div class="w-2/3 bg-gray-200 h-24 flex flex-col items-center justify-center px-1 rounded-r-lg body-step">
                            <h2 class="font-bold text-base">Wallet Address</h2>
                            {/* <p class="text-xs text-gray-600">
                  Anything you want for your credentials
                </p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}