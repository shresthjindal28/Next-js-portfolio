import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaBriefcase, FaReact } from 'react-icons/fa';

const workExperience = [
	{
		title: 'Full Stack Web Engineer',
		company_name: 'Dolt Technologies',
		icon: <FaBriefcase />,
		iconBg: '#E63946',
		date: 'Feb 2025 - Present',
		location: 'San Francisco, CA (Remote)',
		skills: ['React', 'Node.js', 'MongoDB', 'GraphQL', 'AWS'],
		duration: '5+ months',
		status: 'current',
		points: [
			'Developing and maintaining web applications using React, Node.js, and MongoDB.',
			'Collaborating with cross-functional teams in an Agile environment to deliver high-quality features.',
			'Implementing RESTful APIs and integrating third-party services for seamless user experiences.',
			'Participating in code reviews and contributing to architectural decisions for system improvements.',
		],
	},
	{
		title: 'Frontend Developer',
		company_name: 'JoeAF Digital',
		icon: <FaReact />,
		iconBg: '#3b82f6',
		date: 'Dec 2024 - Jan 2025',
		location: 'New York, NY (Contract)',
		skills: ['React', 'Next.js', 'Tailwind CSS', 'Figma', 'Vercel'],
		duration: '2 months',
		status: 'completed',
		points: [
			'Led frontend development for a client\'s promotional website using React and Next.js.',
			'Ensured cross-browser compatibility and responsive design across all device types.',
			'Translated Figma designs into functional, pixel-perfect user interfaces.',
			'Communicated progress and challenges effectively with stakeholders and project managers.',
		],
	},
];

type ExperienceCardProps = {
	experience: typeof workExperience[number];
	index: number;
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
	const cardRef = useRef<HTMLDivElement>(null);
	
	const { scrollYProgress } = useScroll({
		target: cardRef,
		offset: ["start end", "end start"]
	});

	const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
	const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

	   const cardVariants = {
			   hidden: { opacity: 0, y: 60, scale: 0.9 },
			   visible: {
					   opacity: 1,
					   y: 0,
					   scale: 1,
					   transition: {
							   transition: 'spring',
							   stiffness: 100,
							   damping: 15,
							   delay: index * 0.2,
					   },
			   },
	   };

	return (
		<motion.div
			ref={cardRef}
			className="relative group"
			variants={cardVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.3 }}
			style={{ y, opacity }}
		>
			{/* Status Badge */}
			{experience.status === 'current' && (
				<motion.div
					className="absolute -top-2 -right-2 z-20 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
				>
					Current
				</motion.div>
			)}

			{/* Card Container */}
			<div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 sm:p-6 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 group-hover:border-cyan-400/50 overflow-hidden">
				
				
				{/* Header Section */}
				<div className="relative z-10 flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6">
					<div className="flex items-center space-x-3 mb-3 sm:mb-0">
						<motion.div
							className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white text-lg shadow-lg"
							style={{ backgroundColor: experience.iconBg }}
							whileHover={{ scale: 1.1, rotate: 5 }}
							transition={{ type: 'spring', stiffness: 300 }}
						>
							{experience.icon}
						</motion.div>
						<div>
							<h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
								{experience.title}
							</h3>
							<p className="text-base sm:text-lg font-semibold text-cyan-400">
								{experience.company_name}
							</p>
						</div>
					</div>
					<div className="text-right text-xs sm:text-sm text-slate-400 self-start">
						<div className="mb-1">{experience.duration}</div>
						<div className="text-xs opacity-75">{experience.date}</div>
					</div>
				</div>

				{/* Location & Date */}
				<div className="flex items-center text-slate-400 text-xs sm:text-sm mb-4 space-x-4">
					<div className="flex items-center space-x-2">
						<div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
						<span>{experience.location}</span>
					</div>
				</div>

				{/* Skills Section */}
				<div className="mb-4">
					<h4 className="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">Technologies</h4>
					<div className="flex flex-wrap gap-1.5">
						{experience.skills.map((skill, skillIndex) => (
							<motion.span
								key={skill + '-' + skillIndex}
								className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-slate-700 to-slate-600 text-slate-200 rounded-md border border-slate-600/50 hover:from-cyan-600/20 hover:to-blue-600/20 hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300 cursor-default"
								whileHover={{ scale: 1.05, y: -2 }}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 * skillIndex }}
							>
								{skill}
							</motion.span>
						))}
					</div>
				</div>

				{/* Achievements */}
				<div>
					<h4 className="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide">Key Achievements</h4>
					<div className="space-y-2">
						{experience.points.slice(0, 2).map((point, pointIndex) => (
							<motion.div
								key={point.substring(0, 20) + '-' + pointIndex}
								className="flex items-start space-x-2 text-slate-300 text-xs sm:text-sm leading-relaxed"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.2 + pointIndex * 0.1 }}
							>
								<div className="w-1 h-1 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
								<span>{point.length > 80 ? `${point.substring(0, 80)}...` : point}</span>
							</motion.div>
						))}
						{experience.points.length > 2 && (
							<div className="text-slate-500 text-xs italic pl-3">
								...and {experience.points.length - 2} more achievements
							</div>
						)}
					</div>
				</div>

				{/* Decorative Elements */}
				<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-xl -translate-y-2 translate-x-2 group-hover:from-cyan-500/20 transition-all duration-500" />
				<div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-xl translate-y-2 -translate-x-2 group-hover:from-blue-500/20 transition-all duration-500" />
			</div>
		</motion.div>
	);
};

const Experience: React.FC = () => {
	const sectionRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	});

	const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

	return (
		<section
			id="work"
			ref={sectionRef}
			className="relative min-h-screen bg-transparent py-12 sm:py-16 lg:py-20 overflow-hidden"
		>
			{/* Animated Background */}
			<motion.div 
				className="absolute inset-0 opacity-20"
				style={{ y: backgroundY }}
			>
				<div className="absolute top-20 left-10 w-48 h-48 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
			</motion.div>

			{/* Grid Pattern Overlay */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute inset-0 bg-slate-800/10" />
			</div>

			<div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header Section */}
				<motion.div
					className="text-center mb-12 sm:mb-16"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
				>
					<motion.h2 
						className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent mb-4 sm:mb-6"
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 1, delay: 0.2 }}
					>
						Work Experience
					</motion.h2>
					<motion.div
						className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-4 sm:mb-6 rounded-full"
						initial={{ width: 0 }}
						whileInView={{ width: 64 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.5 }}
					/>
					<motion.p 
						className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed px-4"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.7 }}
					>
						My professional journey in the tech industry, featuring roles where I&apos;ve 
						contributed to innovative projects and developed cutting-edge solutions.
					</motion.p>
				</motion.div>

				{/* Experience Cards Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12 sm:mb-16">
							   {workExperience.map((experience, index) => (
					   <ExperienceCard
						 key={`${experience.title}-${index}`}
						 experience={experience}
						 index={index}
					   />
							   ))}
				</div>

				{/* Statistics Section */}
				<motion.div
					className="text-center mb-12 sm:mb-16"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
						<motion.div 
							className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 sm:p-6"
							whileHover={{ scale: 1.05, y: -5 }}
							transition={{ type: 'spring', stiffness: 300 }}
						>
							<div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">2+</div>
							<div className="text-slate-300 font-medium text-sm">Companies</div>
						</motion.div>
						<motion.div 
							className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 sm:p-6"
							whileHover={{ scale: 1.05, y: -5 }}
							transition={{ type: 'spring', stiffness: 300 }}
						>
							<div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">10+</div>
							<div className="text-slate-300 font-medium text-sm">Technologies</div>
						</motion.div>
						<motion.div 
							className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 sm:p-6"
							whileHover={{ scale: 1.05, y: -5 }}
							transition={{ type: 'spring', stiffness: 300 }}
						>
							<div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">7+</div>
							<div className="text-slate-300 font-medium text-sm">Months Experience</div>
						</motion.div>
					</div>
				</motion.div>

				{/* Download Resume CTA */}
				<motion.div
					className="text-center"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.3 }}
				>
					<motion.a
						href="/shresth_jinadl_resume.pdf"
						download="shresth_jindal_resume.pdf"
						target="_blank"
						rel="noopener noreferrer"
						className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 text-sm sm:text-base"
						whileHover={{ y: -2 }}
						whileTap={{ scale: 0.98 }}
					>
						<span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						<span className="relative flex items-center space-x-2">
							<span>Download Resume</span>
							<svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
						</span>
					</motion.a>
				</motion.div>
			</div>
		</section>
	);
};

export default Experience;
