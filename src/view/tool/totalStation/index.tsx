import {useCreateTotalStationMutation, useSearchTotalStationsQuery} from "../../../api/totalStation";
import TotalStationTable from "./TotalStationTable";
import React, {useState} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {Button, Form, Modal} from "antd";
import TotalStationForm from "./TotalStationForm";
import EpButton from "../../../components/Button";

export interface ITotalStation {
    id: number;
    firm: string;
    model: string;
    serialNumber: string;
}

export interface TotalStationCreateRequest {
    firm: string;
    model: string;
    serialNumber: string;
}

const TotalStationPage = () => {
    const {data, isLoading} = useSearchTotalStationsQuery();
    const [showAddModal, setShowAddModal] = useState(false);
    const [addTotalStation] = useCreateTotalStationMutation()
    const [form] = Form.useForm();
    const showModal = () => {
        setShowAddModal(true);
    }

    const handleCancel = () => {
        setShowAddModal(false);
    }

    const handleOk = (point: TotalStationCreateRequest) => {
        addTotalStation(point);
        form.resetFields();
        setShowAddModal(false);
    }

    return <>
        <EpButton icon={<PlusOutlined/>} onClick={showModal}/>
        <TotalStationTable totalStations={data ? data : []}/>
        <Modal title="Add total station" open={showAddModal} onOk={form.submit} onCancel={handleCancel} width={500}>
            <TotalStationForm onFinish={handleOk} form={form}/>
        </Modal>
    </>
}

export default TotalStationPage;