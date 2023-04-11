import Head from "next/head";
import { Inter } from "next/font/google";
import { useState } from "react";
import Typewriter from "typewriter-effect";
import BuyMeACoffee from "./components/Buyme";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [book, setbook] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book,
          question,
        }),
      });
      const data = await response.json();
      setOutput(data);
    } catch (error) {
      console.error(error);
      setOutput("Error fetching data");
    }
    setLoading(false);
  };
  return (
    <>
      <Head>
        <title>Ask My Book</title>
        <meta name="description" content="Get answers from your book" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="flex justify-center h-screen">
        <div className="flex-1 h-full bg-oragne-100 p-4">
          <form onSubmit={handleSubmit} className="ml-[2rem] mt-[2rem]">
            <h1 className="text-5xl text-gray-800 font-bold mb-4 ">
              <span className="transform rotate-[-20deg] inline-block pr-2 text-orange-500  ">
                Ask
              </span>{" "}
              My Book
            </h1>
            <p className="text-gray-600 text-2xl ml-5 mt-[3rem] mb-[5rem] font-semibold ">
              {" "}
              Ask any question to your{" "}
              <span className="text-orange-500">favorite books</span> .
            </p>
            <label
              className="block text-gray-800 text-2xl mt-10  font-bold mb-2"
              htmlFor="book"
            >
              Book Name
            </label>
            <input
              className="block w-full p-3 text-2xl rounded bg-white text-gray-700 border  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              id="book"
              type="text"
              placeholder="eg. The Psychology of Money"
              value={book}
              onChange={(event) => setbook(event.target.value)}
              required
            />
            <label
              className="block text-gray-800 text-2xl mt-10  font-bold mb-2"
              htmlFor="question"
            >
              Question
            </label>
            <input
              className="block w-full p-3 text-2xl rounded bg-white text-gray-700 border  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              id="question"
              type="text"
              placeholder="eg. What is luck & risk ?"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              required
            />
            <br />
            <button
              type="submit"
              className="w-full mt-6 bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? "Generating..." : "Generate"}
            </button> 
            <div className="text-xl mt-[2rem]">
                Made by{" "}
                <span className="text-orange-500">
                  <Link href="https://twitter.com/theanuragdev">
                    @theanuragdev
                  </Link>
                </span>
              </div>
            <div className="mt-[3rem]">
              <BuyMeACoffee />
            </div>
          </form>
        </div>
        <div className="flex-1 h-full bg-gray-800 p-4 text-white">
          {output ? (
            <div>
              <h2 className="text-white font-bold text-3xl mb-4 mt-[2rem]">
                Answer:
              </h2>
              <p className="text-white  leading-10 text-2xl mx-10">
                <Typewriter
                  options={{
                    autoStart: true,
                    loop: false,
                    delay: 10,
                    deleteSpeed: Infinity,
                    cursor: "|",
                    strings: [`${output}`],
                  }}
                />
              </p>
            </div>
          ) : (
            <div className="flex justify-center items-center h-full text-2xl font-semibold">
              Ask your question .
            </div>
          )}
        </div>
      </main>
    </>
  );
}
