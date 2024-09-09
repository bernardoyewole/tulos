import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

function CurrentClassButtons({ currentClass, baseClass, relatedClasses, changeClass }) {

    const handleClassChange = (newClass) => {
        changeClass(newClass);
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div>
                <h2 className="text-4xl font-semibold uppercase py-6">{currentClass.CatName}</h2>
                <div className="flex gap-2 overflow-scroll no-scrollbar">
                    <button
                        onClick={() => handleClassChange(baseClass)}
                        className={`px-2 py-1.5 uppercase text-sm font-semibold border-black border whitespace-nowrap ${currentClass?.CatName === baseClass.CatName ? 'bg-black text-white' : 'bg-transparent'}`}
                    >
                        {baseClass.CatName}
                    </button>
                    {relatedClasses.map(c => (
                        c.CategoryValue !== 'view-all' &&
                        <button
                            key={uuidv4()}
                            onClick={() => handleClassChange(c)}
                            className={`px-2 py-1.5 uppercase text-sm font-semibold border-black border whitespace-nowrap ${currentClass?.CatName === c.CatName ? 'bg-black text-white' : 'bg-transparent'}`}
                        >
                            {c.CatName}
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default CurrentClassButtons