import { useState } from 'react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data';
import { BookOpen, Calendar, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Blog() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="blogs" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-10">
      <div className="text-center mb-16">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-2">Padomi un Pieredze</span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 mb-4">
          Ceļojumu blogs
        </h2>
        <p className="font-sans text-stone-600 max-w-2xl mx-auto text-lg font-light">
          Noderīgi padomi, sagatavošanās ieteikumi un aizraujoši stāsti tieši no kalnu takām un tālajiem ceļiem.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post) => (
          <motion.article
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            key={post.id}
            className="bg-white rounded-3xl overflow-hidden border border-stone-200/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col group"
          >
            {/* Image banner */}
            <div className="relative h-56 bg-stone-100 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-xs bg-stone-900/80 backdrop-blur-sm text-stone-200 px-2.5 py-1 rounded-md font-medium">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                {post.readTime} lasīšanai
              </span>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-3 text-stone-400 text-xs font-light mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString('lv-LV', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <span>•</span>
                  <span>Raksta autors: {post.author}</span>
                </div>
                
                <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-amber-600 transition-colors mb-2 leading-tight">
                  {post.title}
                </h3>
                
                <p className="font-sans text-stone-600 text-sm font-light leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              <button
                onClick={() => setActivePost(post)}
                id={`btn-blog-read-${post.id}`}
                className="inline-flex items-center gap-2 text-stone-900 hover:text-amber-600 font-bold text-sm group/btn cursor-pointer self-start transition-colors pt-2"
              >
                <span>Lasīt vairāk</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Blog Post Full View Modal */}
      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col border border-stone-200"
            >
              {/* Header Image */}
              <div className="relative h-52 sm:h-64 bg-stone-900">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/50" />
                
                {/* Close */}
                <button
                  onClick={() => setActivePost(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 text-stone-200 text-xs font-medium mb-1.5">
                    <span>{new Date(activePost.date).toLocaleDateString('lv-LV', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span>•</span>
                    <span>Autors: {activePost.author}</span>
                  </div>
                  <h2 className="font-display text-xl sm:text-3xl font-bold text-white shadow-sm leading-tight">
                    {activePost.title}
                  </h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                <div className="font-sans text-stone-700 font-light text-sm sm:text-base leading-relaxed space-y-4">
                  {/* Content rendered nicely with paragraphs */}
                  {activePost.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
                  <span className="font-sans text-xs text-stone-400">
                    Sagatavoja Mārtiņš • Ceļojumu blogs
                  </span>
                  
                  <button
                    onClick={() => setActivePost(null)}
                    className="py-2 px-5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium rounded-xl text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    Aizvērt rakstu
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
