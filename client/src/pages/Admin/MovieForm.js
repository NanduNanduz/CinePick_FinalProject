import React from 'react'
import { Form, Modal, Row, Col, Button } from 'antd'

function MovieForm({
    showMovieFormModal,
    setShowMovieFormModal,
    selectedMovie,
    setSelectedMovie,
    formType
}) {
    return (
        <Modal title={formType === "add" ? "Add Movie" : "Edit Movie"}
            open={showMovieFormModal}
            onCancel={() => setShowMovieFormModal(false)}
            footer={null}
            width={800}
        >
            <Form
                layout='vertical' >
                <Row
                    gutter={16}>

                    <Col span={24}>
                        <Form.Item label="Movie Name" name='title'>
                            <input type="text" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label="Movie Description" name='description'>
                            <textarea type="text" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Movie Duration" name='duration'>
                            <input type="text" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Language" name='language'>
                            <select name="" id="">
                                <option value="">Select Language</option>
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Tamil">Tamil</option>
                                <option value="Telugu">Telugu</option>
                            </select>
                        </Form.Item>
                    </Col>


                    <Col span={8}>
                        <Form.Item label=" Movie Release Date" name='releaseDate'>
                            <input type="text" />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item label="Genre" name='genre'>
                            <select name="" id="">
                                <option value="">Select Genre</option>
                                <option value="Action">Action</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Drama">Drama</option>
                                <option value="Romance">Romance</option>
                                <option value="Hindi">Hindi</option>
                            </select>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Poster URL" name='poster'>
                            <input type="text" />
                        </Form.Item>
                    </Col>
                </Row>

                <div className="flex justify-end">
                    <Button title='Cancel' variant="outlined" type="button"
                    onClick={{() =>{
                        
                    }}}
                    />
                    <Button title='Save' type="submit" />
                </div>

            </Form>
        </Modal>

    );
}

export default MovieForm;
