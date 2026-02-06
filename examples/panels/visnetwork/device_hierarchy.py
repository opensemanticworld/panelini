"""Device hierarchy example with hierarchical layout.

Demonstrates a device ontology with:
- Device nodes (multi-level hierarchy)
- Process nodes (typical operations for devices)
- Edge types: SubclassOf, HasTypicalProcess
"""

import panel as pn

from panelini.panels.visnetwork import VisNetwork

pn.extension()

# Device nodes
device_nodes = [
    # Root level
    {"id": "Thing", "label": "Thing", "group": "device_root", "title": "Generic thing", "level": 0},
    {"id": "PhysicalAsset", "label": "Physical Asset", "group": "device_root", "title": "Tangible asset", "level": 1},
    {"id": "Asset", "label": "Asset", "group": "device_root", "title": "Physical or logical asset", "level": 1},
    {"id": "Equipment", "label": "Equipment", "group": "device_root", "title": "Installed equipment", "level": 2},
    {"id": "Device", "label": "Device", "group": "device_root", "title": "Generic device", "level": 3},
    # High-Level device categories
    {
        "id": "MeasurementDevice",
        "label": "Measurement Device",
        "group": "device_measurement",
        "title": "Devices intended for measurement",
        "level": 4,
    },
    {
        "id": "ProductionDevice",
        "label": "Production Device",
        "group": "device_production",
        "title": "Devices used in production / manufacturing",
        "level": 4,
    },
    {
        "id": "TransportDevice",
        "label": "Transport Device",
        "group": "device_production",
        "title": "Devices used for transport and handling of goods",
        "level": 4,
    },
    # Production device subclasses
    {
        "id": "CuttingDevice",
        "label": "Cutting Device",
        "group": "device_cutting",
        "title": "Devices that remove material by cutting",
        "level": 5,
    },
    {
        "id": "FormingDevice",
        "label": "Forming Device",
        "group": "device_production",
        "title": "Devices that form or shape material",
        "level": 5,
    },
    {
        "id": "PrintingDevice",
        "label": "Printing Device",
        "group": "device_printing",
        "title": "Devices that add material layer by layer or print",
        "level": 5,
    },
    {
        "id": "AssemblyDevice",
        "label": "Assembly Device",
        "group": "device_production",
        "title": "Devices that assemble components",
        "level": 5,
    },
    # 3D Printer hierarchy
    {"id": "3DPrinter", "label": "3D Printer", "group": "device_printing", "title": "Generic 3D printer", "level": 6},
    {
        "id": "FDMPrinter",
        "label": "FDM Printer",
        "group": "device_printing",
        "title": "Fused Deposition Modeling printer",
        "level": 7,
    },
    {
        "id": "SLAPrinter",
        "label": "SLA Printer",
        "group": "device_printing",
        "title": "Stereolithography 3D printer",
        "level": 7,
    },
    {
        "id": "SLSPrinter",
        "label": "SLS Printer",
        "group": "device_printing",
        "title": "Selective Laser Sintering 3D printer",
        "level": 7,
    },
    # Cutting devices
    {"id": "Knife", "label": "Knife", "group": "device_cutting", "title": "Manual cutting tool", "level": 6},
    {"id": "Cutter", "label": "Cutter", "group": "device_cutting", "title": "Generic cutting tool", "level": 6},
    {
        "id": "LaserCutter",
        "label": "Laser Cutter",
        "group": "device_cutting",
        "title": "Laser-based cutting machine",
        "level": 6,
    },
    {
        "id": "CNCMill",
        "label": "CNC Mill",
        "group": "device_cutting",
        "title": "Computer-controlled milling machine",
        "level": 6,
    },
    {"id": "Saw", "label": "Saw", "group": "device_cutting", "title": "Mechanical saw", "level": 6},
    # Other production devices
    {
        "id": "Press",
        "label": "Press",
        "group": "device_production",
        "title": "Mechanical or hydraulic press",
        "level": 6,
    },
    {
        "id": "InjectionMoldingMachine",
        "label": "Injection Molding Machine",
        "group": "device_production",
        "title": "Machine for plastic injection molding",
        "level": 6,
    },
    {"id": "RobotArm", "label": "Robot Arm", "group": "device_production", "title": "Industrial robot arm", "level": 6},
    {"id": "Conveyor", "label": "Conveyor", "group": "device_production", "title": "Conveyor belt system", "level": 6},
    # Measurement device hierarchy
    {
        "id": "AnalyticalMeasurementDevice",
        "label": "Analytical Measurement Device",
        "group": "device_measurement",
        "title": "Devices for analytical measurements",
        "level": 5,
    },
    {
        "id": "ElectricalMeasurementDevice",
        "label": "Electrical Measurement Device",
        "group": "device_electrical",
        "title": "Devices for electrical quantities",
        "level": 5,
    },
    {
        "id": "OpticalMeasurementDevice",
        "label": "Optical Measurement Device",
        "group": "device_optical",
        "title": "Devices that measure light or spectra",
        "level": 5,
    },
    # Electrical measurement devices
    {
        "id": "SourceMeasureUnit",
        "label": "Source-Measure-Unit",
        "group": "device_electrical",
        "title": "SMU: source and measure voltage/current",
        "level": 6,
    },
    {
        "id": "Multimeter",
        "label": "Multimeter",
        "group": "device_electrical",
        "title": "Handheld or benchtop multimeter",
        "level": 6,
    },
    {
        "id": "Oscilloscope",
        "label": "Oscilloscope",
        "group": "device_electrical",
        "title": "Time-domain voltage measurement",
        "level": 6,
    },
    {
        "id": "PowerSupply",
        "label": "DC Power Supply",
        "group": "device_electrical",
        "title": "Programmable DC power supply",
        "level": 6,
    },
    {
        "id": "LCRMeter",
        "label": "LCR Meter",
        "group": "device_electrical",
        "title": "Measures inductance, capacitance, and resistance",
        "level": 6,
    },
    # Optical measurement devices
    {
        "id": "Spectrometer",
        "label": "Spectrometer",
        "group": "device_optical",
        "title": "Spectrometer for spectral analysis",
        "level": 6,
    },
    {
        "id": "OpticalPowerMeter",
        "label": "Optical Power Meter",
        "group": "device_optical",
        "title": "Measures optical power",
        "level": 6,
    },
    {
        "id": "ImagingSystem",
        "label": "Imaging System",
        "group": "device_optical",
        "title": "Camera or microscope system",
        "level": 6,
    },
    {
        "id": "Colorimeter",
        "label": "Colorimeter",
        "group": "device_optical",
        "title": "Measures color and color temperature",
        "level": 6,
    },
    # Other measurement devices
    {
        "id": "TemperatureController",
        "label": "Temperature Controller",
        "group": "device_measurement",
        "title": "Controls and measures temperature",
        "level": 5,
    },
    {
        "id": "PressureSensor",
        "label": "Pressure Sensor",
        "group": "device_measurement",
        "title": "Measures pressure",
        "level": 5,
    },
    {
        "id": "FlowMeter",
        "label": "Flow Meter",
        "group": "device_measurement",
        "title": "Measures flow of liquids or gases",
        "level": 5,
    },
    {
        "id": "Balance",
        "label": "Balance",
        "group": "device_measurement",
        "title": "Precision weighing scale",
        "level": 5,
    },
    {"id": "pHMeter", "label": "pH Meter", "group": "device_measurement", "title": "Measures acidity (pH)", "level": 5},
]

# Process nodes
process_nodes = [
    {
        "id": "Cutting",
        "label": "Cutting",
        "group": "process",
        "shape": "box",
        "title": "Generic cutting process",
        "level": 8,
    },
    {
        "id": "Milling",
        "label": "Milling",
        "group": "process",
        "shape": "box",
        "title": "Material removal by milling",
        "level": 8,
    },
    {
        "id": "LaserCutting",
        "label": "Laser Cutting",
        "group": "process",
        "shape": "box",
        "title": "Cutting using a laser beam",
        "level": 8,
    },
    {"id": "Sawing", "label": "Sawing", "group": "process", "shape": "box", "title": "Cutting using a saw", "level": 8},
    {
        "id": "3DPrinting",
        "label": "3D Printing",
        "group": "process",
        "shape": "box",
        "title": "Generic 3D printing",
        "level": 8,
    },
    {
        "id": "FDMPrinting",
        "label": "FDM Printing",
        "group": "process",
        "shape": "box",
        "title": "Fused deposition modeling",
        "level": 8,
    },
    {
        "id": "SLAPrinting",
        "label": "SLA Printing",
        "group": "process",
        "shape": "box",
        "title": "Stereolithography printing",
        "level": 8,
    },
    {
        "id": "SLSPrinting",
        "label": "SLS Printing",
        "group": "process",
        "shape": "box",
        "title": "Selective laser sintering printing",
        "level": 8,
    },
    {
        "id": "Pressing",
        "label": "Pressing",
        "group": "process",
        "shape": "box",
        "title": "Pressing and forming operations",
        "level": 8,
    },
    {
        "id": "InjectionMolding",
        "label": "Injection Molding",
        "group": "process",
        "shape": "box",
        "title": "Plastic injection molding",
        "level": 8,
    },
    {
        "id": "Assembly",
        "label": "Assembly",
        "group": "process",
        "shape": "box",
        "title": "Assembly of components",
        "level": 8,
    },
    {
        "id": "MaterialHandling",
        "label": "Material Handling",
        "group": "process",
        "shape": "box",
        "title": "Moving material on a conveyor or robot",
        "level": 8,
    },
    {
        "id": "MeasuringVoltage",
        "label": "Measuring Voltage",
        "group": "process",
        "shape": "box",
        "title": "Voltage measurement",
        "level": 8,
    },
    {
        "id": "MeasuringCurrent",
        "label": "Measuring Current",
        "group": "process",
        "shape": "box",
        "title": "Current measurement",
        "level": 8,
    },
    {
        "id": "MeasuringResistance",
        "label": "Measuring Resistance",
        "group": "process",
        "shape": "box",
        "title": "Resistance measurement",
        "level": 8,
    },
    {
        "id": "MeasuringImpedance",
        "label": "Measuring Impedance",
        "group": "process",
        "shape": "box",
        "title": "Impedance measurement",
        "level": 8,
    },
    {
        "id": "SourcingVoltage",
        "label": "Sourcing Voltage",
        "group": "process",
        "shape": "box",
        "title": "Providing a voltage",
        "level": 8,
    },
    {
        "id": "SourcingCurrent",
        "label": "Sourcing Current",
        "group": "process",
        "shape": "box",
        "title": "Providing a current",
        "level": 8,
    },
    {
        "id": "SpectralAnalysis",
        "label": "Spectral Analysis",
        "group": "process",
        "shape": "box",
        "title": "Analyzing spectra",
        "level": 8,
    },
    {
        "id": "OpticalPowerMeasurement",
        "label": "Optical Power Measurement",
        "group": "process",
        "shape": "box",
        "title": "Measuring optical power",
        "level": 8,
    },
    {"id": "Imaging", "label": "Imaging", "group": "process", "shape": "box", "title": "Capturing images", "level": 8},
    {
        "id": "ColorMeasurement",
        "label": "Color Measurement",
        "group": "process",
        "shape": "box",
        "title": "Measuring color or color temperature",
        "level": 8,
    },
    {
        "id": "TemperatureControl",
        "label": "Temperature Control",
        "group": "process",
        "shape": "box",
        "title": "Setting and stabilizing temperature",
        "level": 8,
    },
    {
        "id": "PressureMeasurement",
        "label": "Pressure Measurement",
        "group": "process",
        "shape": "box",
        "title": "Measuring pressure",
        "level": 8,
    },
    {
        "id": "FlowMeasurement",
        "label": "Flow Measurement",
        "group": "process",
        "shape": "box",
        "title": "Measuring flow rate",
        "level": 8,
    },
    {
        "id": "Weighing",
        "label": "Weighing",
        "group": "process",
        "shape": "box",
        "title": "Measuring mass or weight",
        "level": 8,
    },
    {
        "id": "pHMeasurement",
        "label": "pH Measurement",
        "group": "process",
        "shape": "box",
        "title": "Measuring pH value",
        "level": 8,
    },
]

nodes = device_nodes + process_nodes

# Edges: SubclassOf
edges_subclass = [
    # Root
    {"from": "PhysicalAsset", "to": "Thing", "label": "SubclassOf", "arrows": "to"},
    {"from": "Asset", "to": "Thing", "label": "SubclassOf", "arrows": "to"},
    {"from": "Equipment", "to": "PhysicalAsset", "label": "SubclassOf", "arrows": "to"},
    {"from": "Device", "to": "Equipment", "label": "SubclassOf", "arrows": "to"},
    # High-Level Categories
    {"from": "MeasurementDevice", "to": "Device", "label": "SubclassOf", "arrows": "to"},
    {"from": "ProductionDevice", "to": "Device", "label": "SubclassOf", "arrows": "to"},
    {"from": "TransportDevice", "to": "Device", "label": "SubclassOf", "arrows": "to"},
    # Production device subclasses
    {"from": "CuttingDevice", "to": "ProductionDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "FormingDevice", "to": "ProductionDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "PrintingDevice", "to": "ProductionDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "AssemblyDevice", "to": "ProductionDevice", "label": "SubclassOf", "arrows": "to"},
    # 3D Printer hierarchy
    {"from": "3DPrinter", "to": "PrintingDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "FDMPrinter", "to": "3DPrinter", "label": "SubclassOf", "arrows": "to"},
    {"from": "SLAPrinter", "to": "3DPrinter", "label": "SubclassOf", "arrows": "to"},
    {"from": "SLSPrinter", "to": "3DPrinter", "label": "SubclassOf", "arrows": "to"},
    # Cutting devices
    {"from": "Knife", "to": "CuttingDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "Cutter", "to": "CuttingDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "LaserCutter", "to": "CuttingDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "CNCMill", "to": "CuttingDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "Saw", "to": "CuttingDevice", "label": "SubclassOf", "arrows": "to"},
    # Other production devices
    {"from": "Press", "to": "FormingDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "InjectionMoldingMachine", "to": "FormingDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "RobotArm", "to": "AssemblyDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "Conveyor", "to": "TransportDevice", "label": "SubclassOf", "arrows": "to"},
    # Measurement device specialization
    {"from": "AnalyticalMeasurementDevice", "to": "MeasurementDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "ElectricalMeasurementDevice", "to": "MeasurementDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "OpticalMeasurementDevice", "to": "MeasurementDevice", "label": "SubclassOf", "arrows": "to"},
    # Electrical measurement devices
    {"from": "SourceMeasureUnit", "to": "ElectricalMeasurementDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "Multimeter", "to": "ElectricalMeasurementDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "Oscilloscope", "to": "ElectricalMeasurementDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "PowerSupply", "to": "ElectricalMeasurementDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "LCRMeter", "to": "ElectricalMeasurementDevice", "label": "SubclassOf", "arrows": "to"},
    # Optical measurement devices
    {"from": "Spectrometer", "to": "OpticalMeasurementDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "OpticalPowerMeter", "to": "OpticalMeasurementDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "ImagingSystem", "to": "OpticalMeasurementDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "Colorimeter", "to": "OpticalMeasurementDevice", "label": "SubclassOf", "arrows": "to"},
    # Other measurement devices
    {"from": "TemperatureController", "to": "AnalyticalMeasurementDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "PressureSensor", "to": "AnalyticalMeasurementDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "FlowMeter", "to": "AnalyticalMeasurementDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "Balance", "to": "AnalyticalMeasurementDevice", "label": "SubclassOf", "arrows": "to"},
    {"from": "pHMeter", "to": "AnalyticalMeasurementDevice", "label": "SubclassOf", "arrows": "to"},
]

# Edges: HasTypicalProcess
edges_process = [
    # Cutting
    {"from": "Knife", "to": "Cutting", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    {"from": "Cutter", "to": "Cutting", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    {"from": "LaserCutter", "to": "LaserCutting", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    {"from": "CNCMill", "to": "Milling", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    {"from": "Saw", "to": "Sawing", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    # 3D Printing
    {"from": "3DPrinter", "to": "3DPrinting", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    {"from": "FDMPrinter", "to": "FDMPrinting", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    {"from": "SLAPrinter", "to": "SLAPrinting", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    {"from": "SLSPrinter", "to": "SLSPrinting", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    # Forming and assembly
    {"from": "Press", "to": "Pressing", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    {
        "from": "InjectionMoldingMachine",
        "to": "InjectionMolding",
        "label": "HasTypicalProcess",
        "arrows": "to",
        "dashes": True,
    },
    {"from": "RobotArm", "to": "Assembly", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    {"from": "Conveyor", "to": "MaterialHandling", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    # Electrical measurements - Multimeter
    {"from": "Multimeter", "to": "MeasuringVoltage", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    {"from": "Multimeter", "to": "MeasuringCurrent", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    {"from": "Multimeter", "to": "MeasuringResistance", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    # Electrical measurements - SMU
    {
        "from": "SourceMeasureUnit",
        "to": "MeasuringVoltage",
        "label": "HasTypicalProcess",
        "arrows": "to",
        "dashes": True,
    },
    {
        "from": "SourceMeasureUnit",
        "to": "MeasuringCurrent",
        "label": "HasTypicalProcess",
        "arrows": "to",
        "dashes": True,
    },
    {
        "from": "SourceMeasureUnit",
        "to": "SourcingVoltage",
        "label": "HasTypicalProcess",
        "arrows": "to",
        "dashes": True,
    },
    {
        "from": "SourceMeasureUnit",
        "to": "SourcingCurrent",
        "label": "HasTypicalProcess",
        "arrows": "to",
        "dashes": True,
    },
    # Electrical measurements - Oscilloscope, Power Supply, LCR Meter
    {"from": "Oscilloscope", "to": "MeasuringVoltage", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    {"from": "PowerSupply", "to": "SourcingVoltage", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    {"from": "LCRMeter", "to": "MeasuringImpedance", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    # Optical processes
    {"from": "Spectrometer", "to": "SpectralAnalysis", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    {
        "from": "OpticalPowerMeter",
        "to": "OpticalPowerMeasurement",
        "label": "HasTypicalProcess",
        "arrows": "to",
        "dashes": True,
    },
    {"from": "ImagingSystem", "to": "Imaging", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    {"from": "Colorimeter", "to": "ColorMeasurement", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    # Other physical measurements
    {
        "from": "TemperatureController",
        "to": "TemperatureControl",
        "label": "HasTypicalProcess",
        "arrows": "to",
        "dashes": True,
    },
    {
        "from": "PressureSensor",
        "to": "PressureMeasurement",
        "label": "HasTypicalProcess",
        "arrows": "to",
        "dashes": True,
    },
    {"from": "FlowMeter", "to": "FlowMeasurement", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    {"from": "Balance", "to": "Weighing", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
    {"from": "pHMeter", "to": "pHMeasurement", "label": "HasTypicalProcess", "arrows": "to", "dashes": True},
]

edges = edges_subclass + edges_process

# vis.js Options
options = {
    "groups": {
        "device_root": {"color": {"background": "#e0e0e0", "border": "#9e9e9e"}},
        "device_measurement": {"color": {"background": "#64b5f6", "border": "#1e88e5"}},
        "device_production": {"color": {"background": "#a5d6a7", "border": "#43a047"}},
        "device_cutting": {"color": {"background": "#ffcc80", "border": "#fb8c00"}},
        "device_printing": {"color": {"background": "#ce93d8", "border": "#8e24aa"}},
        "device_electrical": {"color": {"background": "#90caf9", "border": "#1976d2"}},
        "device_optical": {"color": {"background": "#f48fb1", "border": "#c2185b"}},
        "process": {"color": {"background": "#ffffff", "border": "#424242"}},
    },
    "layout": {
        "hierarchical": {
            "enabled": True,
            "direction": "UD",  # Top (root) -> Down (concrete devices & processes)
            "sortMethod": "directed",
            "levelSeparation": 120,
            "nodeSpacing": 80,
            "treeSpacing": 150,
        }
    },
    "physics": {"enabled": False},
    "interaction": {
        "hover": True,
        "navigationButtons": True,
        "keyboard": True,
    },
}


if __name__ == "__main__":
    visnetwork_panel = VisNetwork(
        nodes=nodes,
        edges=edges,
        options=options,
    )
    pn.serve(visnetwork_panel, threaded=True)
