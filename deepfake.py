import tensorflow as tf

model = tf.keras.models.load_model("model/deepfake_detection_model.keras")
model.summary()
