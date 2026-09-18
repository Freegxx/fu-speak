-- 初始化管理员账号 (密码: admin123)
INSERT INTO sys_user (username, password, nickname, level) VALUES 
('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', '管理员', 0);

-- 初始化词书
INSERT INTO word_book (book_id, name, description, icon, word_count, is_personal) VALUES
('cet4', '大学英语四级', 'CET-4 核心词汇', '📘', 5, 0),
('cet6', '大学英语六级', 'CET-6 核心词汇', '📗', 3, 0),
('english2', '英语二', '考研英语二核心词汇', '📙', 2, 0);

-- CET-4 样例单词
INSERT INTO word (word_id, word, phonetic_uk, phonetic_us, definition_cn, definition_en, examples, book_id) VALUES
('cet4_001', 'abandon', '/əˈbændən/', '/əˈbændən/', 'v. 放弃;遗弃;n. 放任', 'to leave somebody/something behind; to give up', '[{"en":"The crew abandoned the burning ship.","cn":"船员们放弃了燃烧的船只。"},{"en":"We had to abandon the car.","cn":"我们不得不弃车。"}]', 'cet4'),
('cet4_002', 'ability', '/əˈbɪləti/', '/əˈbɪləti/', 'n. 能力;才能', 'the fact that somebody/something is able to do something', '[{"en":"A woman of great ability.","cn":"一位能力超强的女性。"},{"en":"He has the ability to bring out the best in others.","cn":"他能够激发别人的最佳潜能。"}]', 'cet4'),
('cet4_003', 'abroad', '/əˈbrɔːd/', '/əˈbrɔːd/', 'adv. 在国外;到国外', 'in or to a foreign country', '[{"en":"She often goes abroad for business.","cn":"她经常出国出差。"},{"en":"He is studying abroad.","cn":"他正在国外留学。"}]', 'cet4'),
('cet4_004', 'absolute', '/ˈæbsəluːt/', '/ˈæbsəluːt/', 'adj. 绝对的;完全的', 'total and complete', '[{"en":"Absolute silence.","cn":"绝对的安静。"},{"en":"She has absolute faith in him.","cn":"她对他完全信任。"}]', 'cet4'),
('cet4_005', 'absorb', '/əbˈzɔːb/', '/əbˈsɔːrb/', 'v. 吸收;吸引;理解', 'to take in liquid, gas or other substance', '[{"en":"Plants absorb carbon dioxide.","cn":"植物吸收二氧化碳。"},{"en":"His work absorbed him completely.","cn":"他的工作让他全神贯注。"}]', 'cet4');

-- CET-6 样例单词
INSERT INTO word (word_id, word, phonetic_uk, phonetic_us, definition_cn, definition_en, examples, book_id) VALUES
('cet6_001', 'abbreviate', '/əˈbriːvieɪt/', '/əˈbriːvieɪt/', 'v. 缩写;缩短', 'to make a word, phrase, or text shorter', '[{"en":"The word \\"information\\" is often abbreviated to \\"info\\".","cn":"\\"information\\"这个词常被缩写为\\"info\\"。"}]', 'cet6'),
('cet6_002', 'abide', '/əˈbaɪd/', '/əˈbaɪd/', 'v. 遵守;忍受', 'to accept and act according to a law, agreement, etc.', '[{"en":"You must abide by the rules.","cn":"你必须遵守规则。"}]', 'cet6'),
('cet6_003', 'abnormal', '/æbˈnɔːml/', '/æbˈnɔːrml/', 'adj. 反常的;异常的', 'different from what is usual or expected', '[{"en":"Abnormal behavior.","cn":"反常的行为。"}]', 'cet6');

-- 英语二 样例单词
INSERT INTO word (word_id, word, phonetic_uk, phonetic_us, definition_cn, definition_en, examples, book_id) VALUES
('eng2_001', 'accelerate', '/əkˈseləreɪt/', '/əkˈseləreɪt/', 'v. 加速;促进', 'to happen or make something happen faster or earlier', '[{"en":"The car accelerated away.","cn":"汽车加速离开了。"}]', 'english2'),
('eng2_002', 'accommodate', '/əˈkɒmədeɪt/', '/əˈkɑːmədeɪt/', 'v. 容纳;为…提供住宿', 'to provide somebody with a place to live, work or sit', '[{"en":"The hotel can accommodate up to 500 guests.","cn":"这家旅馆可容纳500位客人。"}]', 'english2');
