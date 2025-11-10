"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

type Program = {
    id: number;
    type: "undergraduate" | "postGraduate";
    name: string;
    details: string;
    requirements: string;
};

export default function AdmissionPage() {
    const programs: Program[] = [
        {
            id: 1,
            type: "undergraduate",
            name: "BSc in CSE",
            details: "The Computer Science and Engineering program combines a rigorous education in computer science with added emphasis on the physical and architectural underpinnings of modern computer system design. With a background that spans computer science and computer engineering, our graduates are able to address computing systems across the hardwaresoftware spectrum. The objective of the degree is to produce a well-rounded and well-balanced graduate who can use Computer Science tools to solve real world problems. In designing the course, the requirements of IEEE and standards laid down by American, Canadian, British and Indian universities and institutes have been taken into consideration. The aim of the Department of Computer Science & Engineering (CSE) is to enable innovation through research, advance educational programs in CSE and ICT fields and facilitate enrichment of CSE human resources- the students, faculty and staff, thereby establishing itself as a center of excellence at the national and international level.",
            requirements: "Applicants must have passed SSC (or equivalent) and HSC (or equivalent) examination in science group with minimum 2 nd division in both the examinations or five subjects in O-level and three major subjects (Math, Physics and Chemistry) in A-level education are required. The students who have completed SSC and HSC under GPA system will have to have a minimum CGPA of 2.5. The O and A-level students must have an average grade of B. Those having Diploma in the relevant field with equivalent above academic result may be eligible.",
        },
        {
            id: 2,
            type: "undergraduate",
            name: "B.Sc. in CSE (For Diploma)",
            details: "The Computer Science and Engineering program combines a rigorous education in computer science with added emphasis on the physical and architectural underpinnings of modern computer system design. With a background that spans computer science and computer engineering, our graduates are able to address computing systems across the hardwaresoftware spectrum. The objective of the degree is to produce a well-rounded and well-balanced graduate who can use Computer Science tools to solve real world problems. In designing the course, the requirements of IEEE and standards laid down by American, Canadian, British and Indian universities and institutes have been taken into consideration. The aim of the Department of Computer Science & Engineering (CSE) is to enable innovation through research, advance educational programs in CSE and ICT fields and facilitate enrichment of CSE human resources- the students, faculty and staff, thereby establishing itself as a center of excellence at the national and international level.",
            requirements: "Applicants must have passed SSC (or equivalent) and HSC (or equivalent) examination in science group with minimum 2 nd division in both the examinations or five subjects in O-level and three major subjects (Math, Physics and Chemistry) in A-level education are required. The students who have completed SSC and HSC under GPA system will have to have a minimum CGPA of 2.5. The O and A-level students must have an average grade of B. Those having Diploma in the relevant field with equivalent above academic result may be eligible.",
        },
        {
            id: 3,
            type: "undergraduate",
            name: "BBA",
            details: "The Department of Business Administration offers a 4-years degree of Bachelor of Business Administration (BBA). To become a graduate in this field one has to complete 140 credits. The Bachelor of Business Administration (BBA) degree program is designed to provide students with business and management skills necessary to become effective leaders, innovators, and entrepreneurs in today’s competitive world. The degree offers both an academic management education and enough breadth in complementary academic subjects to prepare students to perform effectively in complex organizations, small & medium enterprises (SME) in the private, public & Non-Government Organizations (NGOs).",
            requirements: "Minimum 2nd division or GPA 2.5 in both SSC and HSC or equivalent examinations of `O’ Level in five subjects and `A’ Level in two major subjects with minimum `C’ in each or US high school diploma. GPA 2.5 can be relaxed to 2.00 but the total GPA (SSC & HSC) should be 6 or above.",
        },
        {
            id: 4,
            type: "undergraduate",
            name: "B.Sc. in EEE",
            details: "The Department of Electrical & Electronic Engineering offers 4 Years graduation program leading to the degree of B.Sc. Engg. in Electrical & Electronic Engineering (B.Sc. Engg. in EEE). The credits for completion of the B.Sc. Engg. in EEE program has been set to 160 credits. The program include courses from (1) general areas namely, Bangla, English, Bangladesh Studies, physics, chemistry, mathematics, social basic mechanical engineering, accounting, business, economics, and management, and from (2) engineering disciplines namely, electrical, electronics, power system, communication, control, and computer engineering as major areas. The program requires some of the courses as core courses and it has left option for the students to choose a few courses as electives for specialization. The curriculum has been designed to make the program goal-oriented to fulfill the needs of the age. Courses on economics, organization management and project management have been included. This has been done to enable the graduates to build management skills because the graduates will also have to manage projects as well as run an organization. These courses will also develop their capability to be entrepreneurs, too.",
            requirements: "Applicants must have passed SSC (or equivalent) and HSC (or equivalent) examination in Science group with minimum 2nd division in both the examinations or five subjects in O-level and three major subjects (Math, Physics and Chemistry) in A-level education are required. The students who have completed SSC and HSC under GPA system will have to have a minimum CGPA of 2.5. The O and A-level students must have an average grade of B. Those having Diploma in the relevant field with equivalent above academic result may be eligible.",
        },
        {
            id: 5,
            type: "undergraduate",
            name: "B.Sc. in Civil Engineering",
            details: "Civil Engineers make, improve and ensure the environment wherein we live. Civil Engineering is an expert designing control that arrangements with the plan, development, and support of the physical and normally assembled environment, including public works like streets, spans, waterways, dams, air terminals, pipelines, segments of structures, railways, water and sewerage frameworks. Students of Civil Engineering department will contribute to develop our entire communication system with the help of modern tools using and advanced knowledge will gathered from ACI,ASTM,IS and BNBC standard. The aim of the Department of Civil Engineering (CE) is to enable innovation through research, advance educational programs in Civil Engineering related fields",
            requirements: "Civil Engineers make, improve and ensure the environment wherein we live. Civil Engineering is an expert designing control that arrangements with the plan, development, and support of the physical and normally assembled environment, including public works like streets, spans, waterways, dams, air terminals, pipelines, segments of structures, railways, water and sewerage frameworks. Students of Civil Engineering department will contribute to develop our entire communication system with the help of modern tools using and advanced knowledge will gathered from ACI,ASTM,IS and BNBC standard. The aim of the Department of Civil Engineering (CE) is to enable innovation through research, advance educational programs in Civil Engineering related fields",
        },
        {
            id: 6,
            type: "undergraduate",
            name: "B.A Hons. in Islamic Studies",
            details: "Additionally, the study of the Arabic language will be a part of this program to comprehend the Islamic rules, regulations and teachings compactly from the context of the Arabian Peninsula in where the Quran was revealed as a constitution for the human being. The aim of this course is to enable students to acquire a comprehensive worldview on Islam as an ideal system and its role in the development of human life according to the teachings and practical guidance of the Quran and Sunnah. Besides the major area of concentration, there will be some courses from a general inter-disciplinary body of knowledge, which will prepare the students to adjust to the reality of the contemporary world facing multi-dimensional issues. As for the level of study; this program offers a degree at the level of certificate to B. A (Hon’s) in Islamic studies. Additionally, the study of the Arabic language will be a part of this program to comprehend the Islamic rules, regulations and teachings compactly from the context of the Arabian Peninsula in where the Quran was revealed as a constitution for the human being. The aim of this course is to enable students to acquire a comprehensive worldview on Islam as an ideal system and its role in the development of human life according to the teachings and practical guidance of the Quran and Sunnah. Besides the major area of concentration, there will be some courses from a general inter-disciplinary body of knowledge, which will prepare the students to adjust to the reality of the contemporary world facing multi-dimensional issues. As for the level of study; this program offers a degree at the level of certificate to B. A (Hon’s) in Islamic studies.",
            requirements: "The entry requirement for the BA (Hons) in Islamic Studies program is a Higher Secondary Certificate (HSC), A Level, Alim or any other equivalent level of education recognized by the competent authority and also fulfilling any other conditions fixed by the authority.",
        },
        {
            id: 7,
            type: "undergraduate",
            name: "B.A Hons. in English",
            details: "The BA Honours in English is a dynamic and comprehensive program designed to promote higher education through the in-depth study of the English language and a wide range of literary traditions. Students explore the masterpieces of English and American literature, non-native literature in English, literature in translation, and cultural studies from various periods and regions. The program aims to refine students’ intellectual and emotional sensibilities while fostering professionalism and ethical conduct, preparing them for leadership roles both at home and abroad. Through a balanced curriculum, the program encourages positive attitudinal changes and a strong moral foundation, equipping students with the ability to discern right from wrong and actively contribute to societal development. It also cultivates awareness of pressing global issues such as peace, environmental sustainability, and equality by promoting tolerance, ethical reasoning, and a spirit of universal brotherhood. Graduates of this program are trained to become a thoughtful, skilled, and globally aware workforce, with refined competencies in English language, world literature, and cross-cultural appreciation—ready to meet the challenges of a rapidly changing world.",
            requirements: "Minimum 2nd division or GPA 2.5 in both SSC and HSC or equivalent examinations of `O’ Level in five subjects and `A’ Level in two major subjects with minimum `C’ in each or US high school diploma. GPA 2.5 can be relaxed to 2.00 but the total GPA (SSC & HSC) should be 6 or above.",
        },
        {
            id: 8,
            type: "undergraduate",
            name: "LL.B (Honors)",
            details: "The Department of Law offers 144 Credits consisting of 8 semesters in 4 (Four) Academic Years. In each year every student has to complete 2 semesters— First and Second. The program provides students with the basic legal skills of advocacy and research experience essential to pursuing a broader range of career in the Bar Bench, Judiciary, Private Practice or work for government or law agencies, multinational companies, international organizations and University-level teaching. The Department follows interactive teaching methodology to actively involve its students in the learning process ensuring quality education. Students who are particularly interested in Law are highly encouraged to take a closer look at what we are offering.",
            requirements: "The minimum qualifications for admission to the LL.B. Honors Program are as follows: Applicants must have a combined GPA of 8.0 in both SSC and HSC, with a minimum GPA of 3.5 in each; or for GCE O-Level and A-Level, a minimum GPA of 2.5 in five O-Level subjects and a GPA of 2.0 in two A-Level subjects, based on the scale A=5, B=4, C=3, D=2, and E=1 (only one E in either O or A-Level is acceptable); or a US High School Diploma, IB Diploma Program (IB-DP), or equivalent. Applicants with academic qualifications outside of these criteria should contact the Admissions Office to verify eligibility. Students who meet the minimum qualifications will be eligible to sit for an admission test administered by the Admissions Office, and admission to the LL.B. Honors Program will be contingent upon the results of this test.",
        },
        {
            id: 9,
            type: "undergraduate",
            name: "BSS in Journalism and Media Studies",
            details: "Bachelor of Social Science in Journalism and Media Studies.",
            requirements: "For admission to Honors Programs, a total GPA of 5 with a minimum of 2.5 in either SSC or HSC (or equivalent) is required. However, students with a minimum GPA of 2.0 in SSC/HSC (or equivalent) and a total GPA of 6.0 or above may also apply. Additionally, a minimum of five subjects from O-Level and two subjects from A-Level are required for new student admissions. Out of these seven subjects, students must have achieved a B-grade (GPA 4.0) in four subjects and a C-grade (GPA 3.5) in the remaining three subjects. Candidates seeking admission to undergraduate programs, including all diploma holders from government or UGC-approved institutions or related councils, will be considered equivalent to HSC and are required to take the standard admission test.",
        },
        {
            id: 10,
            type: "undergraduate",
            name: "BA(Honors) in Bangla",
            details: "শুভেচ্ছাসহ স্বাগতম জানাই বাংলা বিভাগে। পুণ্ড্র ইউনিভার্সিটি অব সায়েন্স অ্যান্ড টেকনোলজিতে এ বিভাগের সুষ্ঠু কার্যক্রম স্বগতিতে এগিয়ে চলছে। বাংলা ও বাঙালির পরিচিতির স্মারকবার্তা প্রদান করে এই বিভাগ; পাঠদানের মাধ্যমে পরিচালিত হয় সে ছকাবদ্ধ পরিকল্পনা। বাংলা ভাষা ও সাহিত্য সম্পর্কে শিক্ষানবিশদের দক্ষতা বৃদ্ধি এবং সেসবের ব্যবহারিক প্রয়োগের ফলাফলে মানবজাতি ও মহাবিশ্বের কল্যাণ প্রতিষ্টাই আমাদের ব্রত।এই শপথ গ্রহণ করে বাংলা বিভাগের শিক্ষাগুরু গণ আলো ছড়ানোয় কর্মব্যস্ত সময় যাপন করেন। প্রথাবদ্ধ প্রচলনে অভ্যস্ত না হয়ে বরং ভারতীয় উপমহাদেশের গণ্ডি অতিক্রম করে বাংলা ভাষা ও সাহিত্যিকে অধিক বিকাশিতকরণের লক্ষে গবেষণাধর্মী অধ্যয়নের চর্চায় শিক্ষক-শিক্ষার্থীগণ প্রতিশ্রুতিশীল। এ যাত্রায় নিজ শিকড়কে জানতে এবং সেই প্রজ্ঞাবোধকে শিখরে প্রতিস্থাপন করতে আমরা পরিশ্রমী ও সংকল্পাবদ্ধ শিক্ষার্থীদের সন্ধানে তৃষ্ণার্ত.",
            requirements: "Applicants must have passed SSC (or equivalent) and HSC (or equivalent) examinations with a minimum CGPA of 2.5 for both. The O and A-level students must have an average grade of B.",
        },
        {
            id: 11,
            type: "postGraduate",
            name: "Master of Business Administration (2-Years)",
            details: "Master of Business Administration (MBA) program is a professional graduate program for individuals who plan for managerial careers in business, government and industry. The objective of the program is to develop skills and judgment of an individual for effective management. The main emphasis is to develop student’s ability to evaluate business and organizational situations so as to make informed and creative judgment about policy and operations.The MBA program begins with a sequence of fundamental courses and is followed by a range of core courses. Students normally complete the course work, followed by an internship program, in a maximum of four successive Semesters.",
            requirements: "Minimum entry requirement for MBA (for BBA) Program is a Bachelor’s Degree on Business Administration in any major from any authorized university with CGPA 2.50 out of 4.00. Minimum entry requirement for MBA Program is a Bachelor’s Degree from any discipline including engineering, agriculture or medicine etc.",
        },
        {
            id: 12,
            type: "postGraduate",
            name: "Exec. Master of Business Administration",
            details: "Executive Master of Business Administration (EMBA) program is a professional graduate program for individuals who plan for managerial careers in business, government and industry. The objective of the program is to develop skills and judgment of an individual for effective management. The main emphasis is to develop student’s ability to evaluate business and organizational situations so as to make informed and creative judgment about policy and operations.",
            requirements: "Minimum 1 year professional work experience. Minimum entry requirement for EMBA Program is at least a Bachelor Degree.",
        },
        {
            id: 13,
            type: "postGraduate",
            name: "Master of Business Administration (1-Year)",
            details: "Master of Business Administration (MBA) program is a professional graduate program for individuals who plan for managerial careers in business, government and industry. The objective of the program is to develop skills and judgment of an individual for effective management. The main emphasis is to develop student’s ability to evaluate business and organizational situations so as to make informed and creative judgment about policy and operations.The MBA program begins with a sequence of fundamental courses and is followed by a range of core courses. Students normally complete the course work, followed by an internship program, in a maximum of four successive Semesters.",
            requirements: "Minimum entry requirement for MBA (for BBA) Program is a Bachelor’s Degree on Business Administration in any major from any authorized university with CGPA 2.50 out of 4.00.Minimum entry requirement for MBA Program is a Bachelor’s Degree from any discipline including engineering, agriculture or medicine etc.",
        },
        {
            id: 14,
            type: "postGraduate",
            name: "Master of Public Health",
            details: "The Master of Public Health Program of Pundra University of Science & Technology addresses the health needs of the ethnically and socioeconomically diverse populations living in Bangladesh, especially northern region of Bangladesh. The program accomplishes this through the evaluation of students to be effective practitioners of the skills, knowledge and attitudes needed to effectively conduct public health need assessments, program planning, implementation and evaluation, and applied research to address the needs of our communities.The program also emphasizes community service with the underserved populations by working closely with local communities and national agencies, as well as to develop professional opportunities for the students of Master of Public Health Program.",
            requirements: "Applicants must have one of the following qualifications: a BPH/BPH degree in any discipline from a recognized university; an MBBS, BDS, or equivalent degree from a medical college or institute recognized by the Bangladesh Medical and Dental Council; a B.Sc. in Nursing from a recognized nursing college approved by the Bangladesh Nursing and Midwifery Council; or a four-year Honors degree in any discipline from a recognized university with a minimum CGPA of 2.5 or equivalent. Additionally, candidates should have relevant professional experience in the healthcare system—five years for Arts graduates, three years for Social Science graduates, or one year for Health Science graduates. Equivalency of qualifications will be determined by the Equivalency Committee of the Science Faculty, and in some special cases, the Admission Committee may consider exemption or relaxation of the experience requirement.",
        },
        {
            id: 15,
            type: "postGraduate",
            name: "MA in Islamic Studies (2-Years)",
            details: "The Islamic Studies program is designed to introduce Islam as a comprehensive way of life based on the revealed knowledge of the Holy Quran and Sunnah. According to Ibn Khaldun, the aim is “to plant in a Muslim a firm religious belief and good moral character, which purify the soul, improve ethics, and propagate virtue.” This program encompasses all areas related to Islam, including the study of revelation as presented in the Quran and Sunnah, and the intellectual effort to understand and apply it in practice. The curriculum integrates three major areas of concentration: Tafsir and Hadith, Islamic Law, and Islamic Banking & Economics. Students will study the text of the Quran and Sunnah with commentary in both classical and modern contexts, explore the importance and development of Islamic jurisprudence, examine the biography of Prophet Muhammad (SAW) to understand the reflection of religious practice on society and Islamic history, and learn the sciences of the Quran and Hadith along with the objectives of Islamic Shariah. The program also emphasizes the insights of Muslim thinkers, both traditional and modern, and their contributions to societal reform in accordance with Quranic teachings. The aim is to provide students with a comprehensive worldview of Islam as an ideal system and its role in human development, while also offering interdisciplinary courses to equip them to address contemporary multi-dimensional issues. The program offers degrees ranging from certificate to M.A. in Islamic Studies (2 years).",
            requirements: "The entry requirement for the M.A in Islamic Studies (2 years) Program is Bachelor or equivalent degree in any area/discipline from a recognized university and also fulfilling any other conditions fixed by the authority.",
        },
        {
            id: 16,
            type: "postGraduate",
            name: "MA in English",
            details: "The Master of Arts (MA) in English program advances English graduates by deepening their knowledge and expertise in English literature, language, and selected general education courses. This comprehensive program covers all aspects of English studies, including historical periods, key authors, significant literary movements, literary theories, criticism, the English language, sociolinguistics, psycholinguistics, and teacher education.",
            requirements: "Applicants must have passed a 4-year-BA Honours in English from any recognized national or international institute with a minimum GPA of 2.50. Total minimum credit requirement to complete the program: According to BNQF: 36 Total class weeks in a semester: 15 Minimum CGPA requirements for graduation: 2.50 Maximum academic years of completion: 01 year",
        },
        {
            id: 17,
            type: "postGraduate",
            name: "B.Ed",
            details: "The Bachelor of Education (B.Ed) is a one-year full time professional degree oriented program of comprising of 2 semesters. This program prepares trainee teachers to understand the aspects of the students’ development and also understand their behavior under different conditions. The course works are combined with rigorous practice of teaching to prepare trainee teacher to grasp the art of teaching and the ability to deal with students based on their individual differences in various classroom situations.",
            requirements: "Candidates must have at least a Bachelor’s degree or an equivalent qualification from a recognized institution, along with satisfactory performance in the admission tests. Admission to the B.Ed. program will be determined based on academic records and, if necessary, performance in the admission tests. The program is designed to enable teachers to enhance and diversify their teaching and learning processes, equipping them to design effective teaching methodologies through an understanding of students’ psychology and contemporary educational issues at both local and global levels.",
        },
        {
            id: 18,
            type: "postGraduate",
            name: "M.Ed",
            details: "Master of Education (M.Ed) is one year professional degree for educators to balance theory, practice and research to allow them to understand the application of concepts in resolving real world instructional challenges, Educators will be allowed to enhance human growth and development, theories of learning, curriculum design and research methods. Along with this, M.Ed degree focuses on the educators professional goals with current market trends for positive social changes in addition to enhancing their career.",
            requirements: "Candidates must have a Postgraduate Diploma in Education (PGDEd), a Bachelor of Education (B.Ed.) degree, or an equivalent qualification from a recognized institution. Admission to the M.Ed. program will be determined based on the candidate’s academic records and, if necessary, performance in the admission tests.",
        },
    ];

    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

    const undergraduatePrograms = programs.filter(p => p.type === "undergraduate");
    const graduatePrograms = programs.filter(p => p.type === "postGraduate");

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-3 bg-gray-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4 bg-sky-500 p-2 rounded text-center text-white">
                    Programs
                </h3>

                <div className=" flex lg:flex-col gap-5">
                    <div>
                        <h4 className="font-semibold mb-2">Undergraduate</h4>
                        <ul className="space-y-1">
                            {undergraduatePrograms.map((p) => (
                                <li
                                    key={p.id}
                                    className="cursor-pointer underline hover:text-blue-600"
                                    onClick={() => setSelectedProgram(p)}
                                >
                                    {p.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className=" lg:mt-4">
                        <h4 className="font-semibold mb-2">Graduate</h4>
                        <ul className="space-y-1">
                            {graduatePrograms.map((p) => (
                                <li
                                    key={p.id}
                                    className="cursor-pointer underline hover:text-blue-600"
                                    onClick={() => setSelectedProgram(p)}
                                >
                                    {p.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Middle Column */}
            <div className="lg:col-span-6 p-4 rounded-lg shadow bg-white">
                <h3 className="text-lg font-semibold mb-4 bg-sky-500 p-2 rounded text-white">
                    Program Details
                </h3>
                {selectedProgram ? (
                    <>
                        <p className="text-gray-700 mb-3">{selectedProgram.details}</p>
                        <h4 className="font-semibold mb-2 bg-sky-500 p-2 rounded text-white">
                            Requirements
                        </h4>
                        <p className="text-gray-700">{selectedProgram.requirements}</p>
                    </>
                ) : (
                    <p className="text-gray-500">
                        Select a program to see details & requirements.
                    </p>
                )}
            </div>

            {/* Right Column */}
            <div className=" lg:h-58   lg:col-span-3 bg-gray-50 p-4 rounded-lg shadow flex flex-col items-center justify-center">
                {selectedProgram ? (
                    <>
                        <h4 className="font-bold mb-4 text-lg text-sky-700">{selectedProgram.name}</h4>
                        <p className="text-gray-700 text-center mb-4">
                            {selectedProgram.details.slice(0, 80)}...
                        </p>
                        <Link
                            href="/apply"
                            className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-700 transition hover:cursor-pointer"
                        >
                            <div className="flex gap-1 items-center"> Online Admission <FaArrowRight></FaArrowRight></div>
                        </Link>
                    </>
                ) : (
                    <p className="text-gray-500 text-center">
                        Select a program from the left to see options.
                    </p>
                )}
            </div>
        </div>
    );
}
