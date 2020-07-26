DROP TABLE IF EXISTS ingredients;

CREATE TABLE ingredients(
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    severity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO ingredients (title) VALUES 
    ('agave syrup'),
    ('amarinth flour'),
    ('bareley'),
    ('buttermilk'),
    ('chicken salt'),
    ('chicory root'),
    ('chicory root extract'),
    ('chickpea flour'),
    ('besan'),
    ('coconut flour'),
    ('einkorn'),
    ('emmer'),
    ('erythritol'),
    ('e968'),
    ('fructans'),
    ('fructooligosaccharides'),
    ('fos'),
    ('fructose'),
    ('fruit concentrate'),
    ('fruit juice'),
    ('garlic'),
    ('garlic powder'),
    ('garlic salt'),
    ('glucose-fructose syrup'),
    ('glukose-fructosesirup'),
    ('gram flour'),
    ('honey'),
    ('high fructose corn syrup'),
    ('hfcs'),
    ('inulin'),
    ('isoglucose'),
    ('isolated fructose'),
    ('isomalt'),
    ('e953'),
    ('khorasan flour'),
    ('kamut'),
    ('lactose'),
    ('lentil flour'),
    ('lupin'),
    ('maltitol'),
    ('e956'),
    ('mannitol'),
    ('e421'),
    ('milk'),
    ('milk curds'),
    ('onion'),
    ('onion salt'),
    ('onion powder'),
    ('sorbitol'),
    ('e420'),
    ('sour cream'),
    ('xylitol'),
    ('e967'),
    ('yogurt')

    
;